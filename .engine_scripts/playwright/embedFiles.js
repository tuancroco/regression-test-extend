const fs = require('fs');
const chalkImport = import('chalk').then((m) => m.default);

const embedCss = async (scenario, page) => {
  if (scenario.useCssOverride) {
    await require('./overrideCSS')(page, scenario);
  }
};

const embedJs = async (scenario, page) => {
  const jsOnReadyPath = scenario.jsOnReadyPath;
  const chalk = await chalkImport;
  const logPrefix = chalk.yellow(`[${scenario.index} of ${scenario.total}] `);

  if (!jsOnReadyPath) {
    return;
  } else if (!fs.existsSync(jsOnReadyPath)) {
    console.log(logPrefix + 'File not exist: ' + jsOnReadyPath);
  } else {
    const jsOnReadyScript = fs.readFileSync(jsOnReadyPath, 'utf-8');
    await page.evaluate(jsOnReadyScript).then(() => console.log(logPrefix + '`onReady` script executed for: ' + scenario.label));
  }
};

module.exports = async (scenario, page) => {
  await embedJs(scenario, page);
  await embedCss(scenario, page);
};
