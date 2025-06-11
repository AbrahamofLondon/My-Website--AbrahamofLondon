/**
 * @jest-environment jsdom
 */
describe('smooth scrolling behavior', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <a href="#section" id="link">Section</a>
      <div id="section"></div>
    `;
    window.scrollTo = jest.fn();
    document.getElementById('section').getBoundingClientRect = () => ({ top: 100 });
    require('../scripts.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  test('clicking anchor prevents default and scrolls', () => {
    const link = document.getElementById('link');
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    link.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(window.scrollTo).toHaveBeenCalled();
  });
});
