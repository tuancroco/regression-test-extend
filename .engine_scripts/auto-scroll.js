module.exports = async () => {
  const SCROLL_DISTANCE = 100;

  const scrollToBottom = async () => {
    await new Promise((resolve) => {
      const timer = setInterval(() => {
        if (window.innerHeight + Math.ceil(window.scrollY) >= document.body.offsetHeight) {
          // you're at the bottom of the page
          clearInterval(timer);
          resolve();
          return;
        }

        window.scrollBy(0, SCROLL_DISTANCE);
      }, 100);
    });
  };

  const scrollToTop = async () => {
    await new Promise((resolve) => {
      const timer = setInterval(() => {
        if (window.scrollY === 0) {
          clearInterval(timer);
          resolve();
          return;
        }

        window.scrollTo(0, 0);
      }, 100);
    });
  };

  await scrollToBottom();
  await scrollToTop();
};
