module.exports = async (page, scenario) => {
  if (!scenario.actions) {
    return;
  }

  for (let i = 0; i < scenario.actions.length; i++) {
    let action = scenario.actions[i];

    if (!action) {
      continue;
    }

    if (!!action.check) {
      console.log('check:', action.check);
      await page.waitForSelector(action.check);
      await page.check(action.check);
    }

    if (!!action.click) {
      console.log('Click:', action.click);
      await page.waitForSelector(action.click);
      await page.click(action.click);
    }

    if (!!action.focus) {
      console.log('Focus:', action.focus);
      await page.waitForSelector(action.focus);
      let el = await page.locator(action.focus);
      el.focus();
    }

    if (!!action.hide) {
      console.log('Hide:', action.hide);
      await page.waitForSelector(action.hide);
      let el = await page.locator(action.hide);
      await el.evaluate((node) => node.style.setProperty('visibility', 'hidden', 'important'));
    }

    if (!!action.hover) {
      console.log('Hover:', action.hover);
      await page.waitForSelector(action.hover);
      await page.locator(action.hover).hover();
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
      let el = await page.locator(action.hide);
      await el.evaluate((node) => node.style.setProperty('display', 'none', 'important'));
    }

    if (!!action.press) {
      console.log('Press:', action.press);
      await page.waitForSelector(action.press);
      await page.locator(action.press).press(action.key);
    }

    if (!!action.scroll) {
      console.log('Scroll:', action.scroll);
      await page.waitForSelector(action.scroll);
      await page.evaluate((scrollToSelector) => {
        document.querySelector(scrollToSelector).scrollIntoView();
      }, action.scroll);
    }

    if (!!action.select) {
      console.log('Select:', action.select);
      if (!!action.value && !!action.label) {
        throw 'Select action must have only either `value` or `label`, not both.';
      }

      if (!action.value && !action.label) {
        throw 'Select action must have only either `value` or `label`';
      }

      await page.waitForSelector(action.select);

      let el = await page.locator(action.select);
      if (!!action.value) {
        await el.selectOption(action.value);
      } else if (!!action.label) {
        el.selectOption({ label: action.label });
      }
    }

    if (!!action.uncheck) {
      console.log('uncheck:', action.uncheck);
      await page.waitForSelector(action.uncheck);
      await page.uncheck(action.uncheck);
    }

    if (!!action.wait) {
      console.log('Wait:', action.wait);
      if (parseInt(action.wait) > 0) {
        await page.waitForTimeout(action.wait);
      } else {
        await page.waitForSelector(action.wait);
      }
    }
  }
};
