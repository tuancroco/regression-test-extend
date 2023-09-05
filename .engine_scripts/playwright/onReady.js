const autoScroll = require('../auto-scroll');
const scrollTop = require('../scroll-top');

module.exports = async (page, scenario, viewport, isReference, browserContext) => {
  await require('./embedFiles')(scenario, page);
  await page.evaluate(autoScroll);

  page.on('load', async (data) => {
    try {
      await require('./embedFiles')(scenario, data);
      await data.evaluate(require('../auto-scroll'));
    } catch (error) {
      console.log(error);
    }
  });

  console.log('SCENARIO > ' + scenario.label);

  if (!!scenario.actions) {
    await require('./actions')(page, scenario);
  } else {
    await require('./clickAndHoverHelper')(page, scenario);
  }

  if (!scenario.noScrollTop) {
    await page.evaluate(scrollTop);
  }

  // add more ready handlers here...
  // await page.waitForLoadState('load', { timeout: 5000 });

  if (scenario.postInteractionWait) {
    await page.waitForTimeout(scenario.postInteractionWait);
  }
};
