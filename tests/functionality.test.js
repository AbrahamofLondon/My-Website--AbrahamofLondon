const { createMockDom, MockEvent, MockElement } = require('./util/mockDom.js');

let initialize;

describe('smooth scrolling anchor behavior', () => {
  beforeAll(() => {
    ({ initialize } = require('../scripts.js'));
  });
  let dom;
  beforeEach(() => {
    dom = createMockDom();
    const anchor = new MockElement('a', { href: '#target', id: 'link' });
    const target = new MockElement('div', { id: 'target' });
    dom.document.body.appendChild(anchor);
    dom.document.body.appendChild(target);
    dom.document.registerElement(anchor);
    dom.document.registerElement(target);
    initialize(dom.document, dom.window);
    dom.document.dispatchEvent(new MockEvent('DOMContentLoaded'));
  });

  test('clicking anchor prevents default navigation', () => {
    const anchor = dom.document.getElementById('link');
    const clickEvent = new MockEvent('click');
    anchor.dispatchEvent(clickEvent);
    expect(clickEvent.defaultPrevented).toBe(true);
  });
});
