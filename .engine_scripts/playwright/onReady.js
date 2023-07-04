const fs = require('fs');
const autoScroll = require('../auto-scroll');

module.exports = async (page, scenario, viewport, isReference, browserContext) => {
  console.log('SCENARIO > ' + scenario.label);

  if (scenario.useCssOverride) {
    await require('./overrideCSS')(page, scenario);
  }

  await page.evaluate(autoScroll);

  if (!!scenario.actions) {
    await require('./actions')(page, scenario);
  } else {
    await require('./clickAndHoverHelper')(page, scenario);
  }

  const jsOnReadyPath = scenario.jsOnReadyPath;

  if (!jsOnReadyPath) {
    return;
  } else if (!fs.existsSync(jsOnReadyPath)) {
    console.log('File not exist: ' + jsOnReadyPath);
  } else {
    const jsOnReadyScript = fs.readFileSync(jsOnReadyPath, 'utf-8');
    await page.evaluate(jsOnReadyScript).then(() => 'ONREADY script executed for: ' + scenario.label);
  }

  // add more ready handlers here...
  // await page.waitForLoadState('load', { timeout: 5000 });
};
