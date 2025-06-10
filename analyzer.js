"use strict";
const fs = require('fs');
const { JSDOM } = require('jsdom');

function loadDocument(path) {
  const html = fs.readFileSync(path, 'utf8');
  const dom = new JSDOM(html);
  return dom.window.document;
}

function checkDuplicateIds(document) {
  const ids = Array.from(document.querySelectorAll('[id]')).map(el => el.id);
  const unique = new Set(ids);
  return { duplicates: ids.length - unique.size, status: ids.length === unique.size };
}

function checkFormLabels(document) {
  const inputs = document.querySelectorAll('input, textarea, select');
  const labeled = Array.from(inputs).filter(input => {
    return (
      input.getAttribute('aria-label') ||
      input.getAttribute('placeholder') ||
      document.querySelector(`label[for="${input.id}"]`)
    );
  });
  return { labeled: labeled.length, total: inputs.length };
}

function checkHeadingHierarchy(document) {
  const h1Count = document.querySelectorAll('h1').length;
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  return { hasSingleH1: h1Count === 1, hasHeadings: headings.length > 0 };
}

function validateHTMLStructure(document) {
  const hasNav = !!document.querySelector('nav');
  const hasMain = !!document.querySelector('main, section');
  const hasFooter = !!document.querySelector('footer');
  return { nav: hasNav, main: hasMain, footer: hasFooter };
}

function calculateHTMLScore(result) {
  let score = 0;
  if (result.doctype) score += 20;
  if (result.semantic >= 3) score += 20;
  if (result.duplicateIds.status) score += 15;
  if (result.formLabels.labeled === result.formLabels.total) score += 15;
  if (result.headingHierarchy.hasSingleH1) score += 15;
  if (result.validation.nav && result.validation.main && result.validation.footer) score += 15;
  return Math.min(score, 100);
}

function analyzeHTML(path) {
  const document = loadDocument(path);
  const result = {
    doctype: Boolean(document.doctype),
    semantic: document.querySelectorAll('nav, main, section, article, aside, header, footer').length,
    duplicateIds: checkDuplicateIds(document),
    formLabels: checkFormLabels(document),
    headingHierarchy: checkHeadingHierarchy(document),
    validation: validateHTMLStructure(document)
  };
  result.score = calculateHTMLScore(result);
  return result;
}

if (require.main === module) {
  const file = process.argv[2] || 'index.html';
  const analysis = analyzeHTML(file);
  console.log(JSON.stringify(analysis, null, 2));
}

module.exports = {
  analyzeHTML,
  checkDuplicateIds,
  checkFormLabels,
  checkHeadingHierarchy,
  validateHTMLStructure,
  calculateHTMLScore
};
