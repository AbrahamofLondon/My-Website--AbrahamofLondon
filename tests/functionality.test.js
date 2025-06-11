/**
 * @jest-environment jsdom
 */

describe('smooth scrolling anchor behavior', () => {
  beforeEach(() => {
    document.body.innerHTML = '<a href="#target" id="link">Go</a><div id="target"></div>';
    jest.resetModules();
    require('../scripts.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  test('clicking anchor prevents default navigation', () => {
    const anchor = document.getElementById('link');
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    anchor.dispatchEvent(clickEvent);
    expect(clickEvent.defaultPrevented).toBe(true);
  });
});
