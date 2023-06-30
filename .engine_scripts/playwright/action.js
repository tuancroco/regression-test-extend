module.exports = async (page, scenario) => {
  if (!scenario.actions) {
    return;
  }

  for (let i = 0; i < scenario.actions.length; i++) {
    let action = scenario.actions[i];

    if (!action) {
      continue;
    }

    if (!!action.click) {
      console.log('Click:', action.click);
      await page.waitForSelector(action.click);
      await page.click(action.click);
    }

    if (!!action.hide) {
      console.log('Hide:', action.hide);
      await page.waitForSelector(action.hide);
      throw 'Not implemented';
    }

    if (!!action.hover) {
      console.log('Hover:', action.hover);
      await page.waitForSelector(action.hover);
      await page.click(action.hover);
    }

    if (!!action.input) {
      console.log('Input:', action.input, action.value);
      await page.waitForSelector(action.input);
      let el = await page.locator(action.input);

      if (!action.append) {
        await el.evaluate((node) => (node.value = ''));
      }

      await el.type(action.value);
    }

    if (!!action.remove) {
      console.log('Remove:', action.remove);
      await page.waitForSelector(action.remove);
      throw 'Not implemented';
    }

    if (!!action.press) {
      console.log('Press:', action.press);
      await page.waitForSelector(action.press);
      await page.locator(action.press).press(action.key);
    }

    if (!!action.wait) {
      console.log('Wait:', action.wait);
      if (parseInt(action.wait) > 0) {
        await page.waitForTimeout(action.wait);
      } else {
        await page.waitForSelector(action.wait);
      }
    }

    if (!!action.scroll) {
      console.log('Scroll:', action.scroll);
      await page.waitForSelector(action.scroll);
      await page.evaluate((scrollToSelector) => {
        document.querySelector(scrollToSelector).scrollIntoView();
      }, action.scroll);
    }
  }
};
