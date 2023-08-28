const autoScroll = require('../auto-scroll');
const scrollTop = require('../scroll-top');

module.exports = async (page, scenario, viewport, isReference, browserContext) => {
  await require('./embedFiles')(scenario, page);
  await page.evaluate(autoScroll);

  page.on('load', async (data) => {
    await require('./embedFiles')(scenario, data);
    await data.evaluate(require('../auto-scroll'));
  });

  console.log('SCENARIO > ' + scenario.label);

  if (!!scenario.actions) {
    await require('./actions')(page, scenario);
  } else {
    await require('./clickAndHoverHelper')(page, scenario);
  }

  await page.evaluate(scrollTop);

  // add more ready handlers here...
  // await page.waitForLoadState('load', { timeout: 5000 });
};
