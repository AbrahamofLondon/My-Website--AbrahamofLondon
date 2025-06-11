const { createMockDom, MockEvent, MockElement } = require('./util/mockDom.js');

let initialize;

describe('scripts.js', () => {
  let dom;
  beforeAll(() => {
    ({ initialize } = require('../scripts.js')); 
  });
  beforeEach(() => {
    jest.resetModules();
    dom = createMockDom();
    const span = new MockElement('span', { id: 'year' });
    dom.document.body.appendChild(span);
    dom.document.registerElement(span);
    initialize(dom.document, dom.window);
  });

  test('updates #year textContent with current year on DOMContentLoaded', () => {
    dom.document.dispatchEvent(new MockEvent('DOMContentLoaded'));
    const yearEl = dom.document.getElementById('year');
    expect(yearEl.textContent).toBe(String(new Date().getFullYear()));
  });
});
