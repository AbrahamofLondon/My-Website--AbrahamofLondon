const fs = require('fs');
const { JSDOM } = require('jsdom');

const htmlPath = 'index.html';
const cssFile = 'styles.css';

function checkDoctype(content) {
  if (!content.trim().toLowerCase().startsWith('<!doctype html>')) {
    console.error('Missing or incorrect DOCTYPE');
    return false;
  }
  return true;
}

function checkStylesheet(dom) {
  const link = dom.window.document.querySelector('link[rel="stylesheet"][href]');
  if (!link || !link.getAttribute('href').includes(cssFile)) {
    console.error(`Stylesheet link to ${cssFile} not found`);
    return false;
  }
  return true;
}

function checkImageAlts(dom) {
  let valid = true;
  dom.window.document.querySelectorAll('img').forEach(img => {
    const alt = img.getAttribute('alt');
    if (!alt || !alt.trim()) {
      console.error(`Image missing alt attribute: ${img.outerHTML}`);
      valid = false;
    }
  });
  return valid;
}

function runChecks() {
  if (!fs.existsSync(htmlPath)) {
    console.error(`Cannot find ${htmlPath}`);
    process.exit(1);
  }

  const html = fs.readFileSync(htmlPath, 'utf-8');
  const dom = new JSDOM(html);

  const results = [
    checkDoctype(html),
    checkStylesheet(dom),
    checkImageAlts(dom)
  ];

  if (results.every(Boolean)) {
    console.log('All checks passed');
  } else {
    process.exitCode = 1;
  }
}

runChecks();
