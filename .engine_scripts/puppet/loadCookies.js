const fs = require('fs');
const YAML = require('js-yaml');

module.exports = async (page, scenario) => {
  let cookies = [];
  const cookiePath = scenario.cookiePath;

  // READ COOKIES FROM FILE IF EXISTS
  if (!!cookiePath && fs.existsSync(cookiePath)) {
    let content = fs.readFileSync(cookiePath);
    if (cookiePath.endsWith('.json')) {
      cookies = JSON.parse(content);
    } else if (cookiePath.endsWith('.yaml') || cookiePath.endsWith('.yml')) {
      cookies = YAML.load(content);
    }
  }

  // MUNGE COOKIE DOMAIN
  cookies = cookies.map((cookie) => {
    if (cookie.domain.startsWith('http://') || cookie.domain.startsWith('https://')) {
      cookie.url = cookie.domain;
    } else {
      cookie.url = 'https://' + cookie.domain;
    }
    delete cookie.domain;
    return cookie;
  });

  // SET COOKIES
  const setCookies = async () => {
    return Promise.all(
      cookies.map(async (cookie) => {
        await page.setCookie(cookie);
      })
    );
  };
  await setCookies();

  // console.log('Cookie state restored with:', JSON.stringify(cookies, null, 2));
  console.log('Cookie state restored for: ' + scenario.label);
};
