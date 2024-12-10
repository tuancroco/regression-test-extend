module.exports = async (page, scenario, viewport, isReference, browserContext) => {
  await require('./login-user')(browserContext, scenario);
  await require('./loadCookies')(browserContext, scenario);
};
