/**
 * @jest-environment jsdom
 */

describe('scripts.js', () => {
  beforeEach(() => {
    jest.resetModules();
    document.body.innerHTML = '<span id="year"></span>';
  });

  test('updates #year textContent with current year on DOMContentLoaded', () => {
    require('../scripts.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    const yearEl = document.getElementById('year');
    expect(yearEl.textContent).toBe(String(new Date().getFullYear()));
  });
});
