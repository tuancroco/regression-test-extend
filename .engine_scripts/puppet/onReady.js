const fs = require('fs');
const autoScroll = require('../auto-scroll');

module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  if (scenario.useCssOverride) {
    await require('./overrideCSS')(page, scenario);
  }
  await require('./clickAndHoverHelper')(page, scenario);

  const jsOnReadyPath = scenario.jsOnReadyPath;

  if (!jsOnReadyPath) {
    return;
  } else if (!fs.existsSync(jsOnReadyPath)) {
    console.log('File not exist: ' + jsOnReadyPath);
    return;
  }

  const jsOnReadyScript = fs.readFileSync(jsOnReadyPath, 'utf-8');
  await page
    .evaluate(jsOnReadyScript)
    .then(() => "ONREADY script executed for: " + scenario.label);

  // add more ready handlers here...
  await page.evaluate(autoScroll);

  await page.waitForNetworkIdle({
    idleTime: 500,
    timeout: 5000
  });
};
