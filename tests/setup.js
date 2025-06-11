// Jest setup file for Abraham of London website tests

// Mock window.fs for file reading tests
global.window = global.window || {};
global.window.fs = {
  readFile: jest.fn().mockResolvedValue('mock file content')
};

// Mock DOM APIs that might not be available in jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null; }
  disconnect() { return null; }
  unobserve() { return null; }
};

// Mock requestAnimationFrame
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

// Mock CSS.supports
window.CSS = {
  supports: jest.fn().mockReturnValue(true)
};

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  // Uncomment to silence console outputs during tests
  // log: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};

// Setup DOM before each test
beforeEach(() => {
  document.body.innerHTML = '';
  document.head.innerHTML = '';
  
  // Reset any mocked functions
  jest.clearAllMocks();
});

// Cleanup after each test
afterEach(() => {
  // Clear any timeouts/intervals
  jest.clearAllTimers();
});

// Global test utilities
global.testUtils = {
  // Helper to create a mock HTML element
  createElement: (tag, attributes = {}, textContent = '') => {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    if (textContent) {
      element.textContent = textContent;
    }
    return element;
  },

  // Helper to simulate user events
  simulateEvent: (element, eventType, eventInit = {}) => {
    const event = new Event(eventType, { bubbles: true, cancelable: true, ...eventInit });
    element.dispatchEvent(event);
    return event;
  },

  // Helper to wait for async operations
  waitFor: (condition, timeout = 1000) => {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const check = () => {
        if (condition()) {
          resolve();
        } else if (Date.now() - startTime > timeout) {
          reject(new Error('Timeout waiting for condition'));
        } else {
          setTimeout(check, 10);
        }
      };
      check();
    });
  }
};
