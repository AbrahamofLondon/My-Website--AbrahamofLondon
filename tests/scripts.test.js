/**
 * @jest-environment jsdom
 */

// Jest DOM setup helpers
require('../Project-documentation/tests/Jest-Test-Setup Code-setup.js');

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

  test('form submission shows sending state and resets fields', () => {
    document.body.innerHTML = `
      <span id="year"></span>
      <form id="contactForm">
        <input type="text" id="name" value="John" />
        <input type="email" id="email" value="john@example.com" />
        <textarea id="message">Hello</textarea>
        <button type="submit">Send</button>
      </form>
    `;

    jest.useFakeTimers();
    require('../scripts.js');
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(submitBtn.textContent).toBe('Sending...');

    jest.runAllTimers();

    expect(submitBtn.textContent).toBe('Message Sent!');
    expect(nameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(messageInput.value).toBe('');

    jest.useRealTimers();
  });
});
