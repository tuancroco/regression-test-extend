const fs = require('fs');
const YAML = require('js-yaml');

module.exports = async (browserContext, scenario) => {
  let cookies = [];
  const cookiePath = scenario.cookiePath;

  // Read Cookies from File, if exists
  if (!!cookiePath && fs.existsSync(cookiePath)) {
    let content = fs.readFileSync(cookiePath);
    if (cookiePath.endsWith('.json')) {
      cookies = JSON.parse(content);
    } else if (cookiePath.endsWith('.yaml') || cookiePath.endsWith('.yml')) {
      cookies = YAML.load(content);
    }
  }

  // Add cookies to browser
  browserContext.addCookies(cookies);

  // console.log('Cookie state restored with:', JSON.stringify(cookies, null, 2));
  console.log('Cookie state restored for: ' + scenario.label);
};
