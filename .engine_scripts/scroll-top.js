module.exports = async () => {
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
