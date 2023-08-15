(() => {
  Cookiebot && Cookiebot.hide();

  window.addEventListener('CookiebotOnDialogDisplay', () => {
    Cookiebot.hide();
  });
})();
