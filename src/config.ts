import fs from 'fs';
import { Config, Scenario, ViewportNext } from 'backstopjs';
import { createScenario } from './scenarios.js';
import path from 'path';
import { getFlagArg, getStringArg, parseDataFromFile } from './helpers.js';
import { fileURLToPath } from 'url';
import { TestSuiteModel, ReplacementModel, ScenarioModel } from './types.js';
import chalk from 'chalk';
import { exit } from 'process';
import YAML from 'js-yaml';

const engine: 'puppeteer' | 'playwright' = 'playwright';
const browser: 'chromium' | 'firefox' | 'webkit' = 'chromium';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testSuite = getStringArg('--test-suite');
const isRef = getFlagArg('--ref');

const scenarios: Scenario[] = [];

const getTestUrl = (url: string, env: ReplacementModel[] | undefined) => {
  if (isRef || !env) {
    return url;
  }

  let testUrl = url;
  env.forEach(e => testUrl = testUrl.replace(e.ref, e.test));

  return testUrl;
}

const getScriptPath = (path: string, engine: 'puppeteer' | 'playwright') => {
  return (engine == 'puppeteer' ? 'puppet' : 'playwright') + path;
}

if (!testSuite) {
  console.log(chalk.red('Argument `--test-suite` must be set.'));
  console.log(chalk.red('Sample command: npm run <command> -- --test-suite <test-suite>'));
  console.log(chalk.red('Command is either `ref`, `approve` or `test`.'));
  exit(1);
}

const getData = (testSuite: String): TestSuiteModel | undefined => {
  let extensions: { ext: string, parse: (content: string) => unknown }[] = [
    {
      ext: 'yaml',
      parse: YAML.load
    },
    {
      ext: 'yaml',
      parse: YAML.load
    },
    {
      ext: 'json',
      parse: JSON.parse
    }
  ];

  for (let i = 0; i < extensions.length; i++) {
    const dataPath = path.resolve(__dirname, `../data/${testSuite}.tests.${extensions[i].ext}`);

    if (fs.existsSync(dataPath)) {
      console.log('Data path: ', dataPath);
      const content = fs.readFileSync(dataPath, 'utf-8');
      return extensions[i].parse(content) as TestSuiteModel;
    };
  }
}

const expandScenarios = (model: ScenarioModel, scenarios: ScenarioModel[], level: number) => {
  if (level > 100) {
    throw "Level is too large";
  }

  if (!model.needs) {
    return;
  }

  const neededActions: string[] = [];
  if (typeof model.needs === 'string') {
    neededActions.push(model.needs);
  } else {
    model.needs.forEach(n => neededActions.push(n));
  }

  neededActions.reverse().forEach((n) => {
    const targetScenarios = scenarios.filter(s => !!s.id && s.id.toLowerCase() == n.toLowerCase());
    if (targetScenarios.length !== 1) {
      throw `The test suite must contains exactly ONE scenario with id: ${n}`;
    }

    var targetScenario = targetScenarios[0];
    expandScenarios(targetScenario, scenarios, level + 1);
    if (!!targetScenario.actions) {
      if (!model.actions) {
        model.actions = [];
      }
      model.actions = [...targetScenario.actions, ...model.actions];
    }
  });

  model.needs = undefined;
}

const data = getData(testSuite);
const viewports = parseDataFromFile(data?.viewportsPath ?? 'data/_viewports.yaml') as ViewportNext[];
if (data) {
  [].forEach.call(data.scenarios, (s: ScenarioModel) => {
    expandScenarios(s, data.scenarios, 0);
  });

  data.scenarios.forEach((s, index) => {
    const opts: ScenarioModel = {
      ...s,
      url: isRef ? s.url : getTestUrl(s.url, data.env),
      index,
      total: data.scenarios.length,
      delay: s.delay ?? 1000,
      hideSelectors: s.hideSelectors ?? data.hideSelectors,
      removeSelectors: s.removeSelectors ?? data.removeSelectors,
      useCssOverride: s.useCssOverride ?? data.useCssOverride,
      jsOnReadyPath: s.jsOnReadyPath,
      viewports: s.viewportNames ? viewports.filter(v => s.viewportNames?.includes(v.label)) : undefined,
      referenceUrl: !isRef ? s.url : undefined
    };

    const scenario = createScenario(opts);
    scenarios.push(scenario);
  });
}


export const config: Config = {
  id: testSuite,
  viewports,
  onBeforeScript: getScriptPath("/onBefore.js", engine),
  onReadyScript: getScriptPath("/onReady.js", engine),
  scenarios,
  paths: {
    bitmaps_reference: ".backstop/" + testSuite + "/bitmaps_reference",
    bitmaps_test: ".backstop/" + testSuite + "/bitmaps_test",
    engine_scripts: ".engine_scripts",
    html_report: ".backstop/" + testSuite + "/html_report",
    ci_report: ".backstop/" + testSuite + "/ci_report"
  },
  report: [isRef ? 'CI' : 'browser'],
  engine,
  engineOptions: {
    args: [
      '--disable-infobars',
      '--disable-setuid-sandbox',
      '--ignore-certifcate-errors',
      '--ignore-certifcate-errors-spki-list',
      '--no-sandbox',
      '--window-position=0,0',
    ],
    browser
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: data?.debug
};

export default config;
