class MockEvent {
  constructor(type) {
    this.type = type;
    this.defaultPrevented = false;
  }
  preventDefault() {
    this.defaultPrevented = true;
  }
}

class MockElement {
  constructor(tagName, attrs = {}) {
    this.tagName = tagName;
    this.attrs = { ...attrs };
    this.children = [];
    this.textContent = '';
    this.listeners = {};
  }

  getAttribute(name) {
    return this.attrs[name];
  }

  setAttribute(name, value) {
    this.attrs[name] = value;
  }

  addEventListener(type, cb) {
    (this.listeners[type] = this.listeners[type] || []).push(cb);
  }

  dispatchEvent(event) {
    const handlers = this.listeners[event.type] || [];
    handlers.forEach(h => h.call(this, event));
    return !event.defaultPrevented;
  }

  appendChild(child) {
    this.children.push(child);
  }

  getBoundingClientRect() {
    return { top: 0 };
  }
}

class MockDocument {
  constructor() {
    this.body = new MockElement('body');
    this.elementsById = {};
    this.listeners = {};
  }

  registerElement(el) {
    const id = el.getAttribute('id');
    if (id) {
      this.elementsById[id] = el;
    }
  }

  getElementById(id) {
    return this.elementsById[id] || null;
  }

  querySelector(selector) {
    if (selector.startsWith('#')) {
      return this.getElementById(selector.slice(1));
    }
    return null;
  }

  querySelectorAll(selector) {
    if (selector === 'a[href^="#"]') {
      const result = [];
      const stack = [...this.body.children];
      while (stack.length) {
        const el = stack.pop();
        if (el.tagName === 'a' && el.getAttribute('href') && el.getAttribute('href').startsWith('#')) {
          result.push(el);
        }
        stack.push(...el.children);
      }
      return result;
    }
    return [];
  }

  addEventListener(type, cb) {
    (this.listeners[type] = this.listeners[type] || []).push(cb);
  }

  dispatchEvent(event) {
    const handlers = this.listeners[event.type] || [];
    handlers.forEach(h => h.call(this, event));
  }
}

class MockWindow {
  constructor() {
    this.scrollY = 0;
    this.scrollTo = jest.fn();
  }
}

function createMockDom() {
  const doc = new MockDocument();
  const win = new MockWindow();
  return { document: doc, window: win };
}

module.exports = { MockEvent, MockElement, MockDocument, MockWindow, createMockDom };
