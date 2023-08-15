const fs = require('fs');
const path = require('path');

/**
 * OVERRIDE CSS
 * Apply this CSS to the loaded page, as a way to override styles.
 *
 * Use this in an onReady script E.G.
  ```
  module.exports = async function(page, scenario) {
    await require('./overrideCSS')(page, scenario);
  }
  ```
 *
 */

module.exports = async (page, scenario) => {
  const cssOverridePath = scenario.cssOverridePath;

  if (!cssOverridePath) {
    return;
  } else if (!fs.existsSync(cssOverridePath)) {
    console.log('File not exist: ' + cssOverridePath);
    return;
  }

  // const override = fs.readFileSync(cssOverridePath, 'utf-8');

  // inject arbitrary css to override styles
  await page.addStyleTag({
    path: cssOverridePath,
  });

  console.log('BACKSTOP_TEST_CSS_OVERRIDE injected for: ' + scenario.label);
  // console.log(override);
};
