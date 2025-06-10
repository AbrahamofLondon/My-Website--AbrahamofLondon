const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { handler } = require('../netlify/functions/contact.js');

describe('contact function', () => {
  test('accepts POST and echoes data', async () => {
    const res = await handler({ httpMethod: 'POST', body: JSON.stringify({ email: 'a@example.com' }) });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.message).toBe('Received');
    expect(body.data.email).toBe('a@example.com');
  });

  test('rejects non-POST method', async () => {
    const res = await handler({ httpMethod: 'GET' });
    expect(res.statusCode).toBe(405);
  });
});

describe('form markup', () => {
  test('memoir form posts to endpoint via POST', () => {
    const html = fs.readFileSync(path.join(__dirname, '../fathering/memoir.index.html'), 'utf8');
    const dom = new JSDOM(html);
    const form = dom.window.document.querySelector('.email-form');
    expect(form.getAttribute('action')).toBe('/.netlify/functions/contact');
    expect(form.getAttribute('method')).toBe('POST');
  });

  test('newsletter form posts to endpoint via POST', () => {
    const html = fs.readFileSync(path.join(__dirname, '../fathering/blog/fiction.index.html'), 'utf8');
    const dom = new JSDOM(html);
    const form = dom.window.document.querySelector('.newsletter-form');
    expect(form.getAttribute('action')).toBe('/.netlify/functions/contact');
    expect(form.getAttribute('method')).toBe('POST');
  });
});
