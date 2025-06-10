/**
 * @jest-environment jsdom
 */

const setup = require('../Project-documentation/tests/Jest-Test-Setup Code-setup.js');

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

  test('form submission button text changes and fields reset', () => {
    jest.useFakeTimers();

    document.body.innerHTML = `
      <form id="contactForm">
        <input id="name" value="John" />
        <input id="email" value="john@example.com" />
        <textarea id="message">Hello</textarea>
        <button type="submit" class="submit-button">Send Message</button>
      </form>
    `;

    require('../scripts.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));

    const form = document.getElementById('contactForm');
    const button = form.querySelector('.submit-button');

    global.testUtils.simulateEvent(form, 'submit');

    expect(button.textContent).toBe('Sending…');

    jest.advanceTimersByTime(1000);
    expect(button.textContent).toBe('Message Sent!');
    expect(form.querySelector('#name').value).toBe('');
    expect(form.querySelector('#email').value).toBe('');
    expect(form.querySelector('#message').value).toBe('');

    jest.advanceTimersByTime(1000);
    expect(button.textContent).toBe('Send Message');

    jest.useRealTimers();
  });
});
