// src/scripts/test/setupTests.js
global.testUtils = {
  simulateClick: (element) => element.dispatchEvent(new MouseEvent('click')),
};
