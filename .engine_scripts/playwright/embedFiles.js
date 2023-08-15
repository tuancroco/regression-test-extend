const fs = require('fs');

const embedCss = async (scenario, page) => {
  if (scenario.useCssOverride) {
    await require('./overrideCSS')(page, scenario);
  }
};

const embedJs = async (scenario, page) => {
  const jsOnReadyPath = scenario.jsOnReadyPath;

  if (!jsOnReadyPath) {
    return;
  } else if (!fs.existsSync(jsOnReadyPath)) {
    console.log('File not exist: ' + jsOnReadyPath);
  } else {
    const jsOnReadyScript = fs.readFileSync(jsOnReadyPath, 'utf-8');
    await page.evaluate(jsOnReadyScript).then(() => console.log('onReady script executed for: ' + scenario.label));
  }
};

module.exports = async (scenario, page) => {
  await embedJs(scenario, page);
  await embedCss(scenario, page);
};
