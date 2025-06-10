const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

function findHtmlFiles(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findHtmlFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

function analyzeFile(filePath) {
  const html = fs.readFileSync(filePath, 'utf-8');
  const dom = new JSDOM(html);
  const { document } = dom.window;

  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  const title = document.querySelector('title');
  const desc = document.querySelector('meta[name="description"]');
  const images = Array.from(document.querySelectorAll('img'));
  const imagesWithAlt = images.filter(img => img.hasAttribute('alt'));
  const scripts = document.querySelectorAll('script').length;

  const structuralScore = (header ? 0.5 : 0) + (footer ? 0.5 : 0);
  const seoScore = (title ? 0.5 : 0) + (desc ? 0.5 : 0);
  const accessibilityScore = images.length ? imagesWithAlt.length / images.length : 1;
  const performanceScore = 1 / (1 + scripts);

  const overall = (structuralScore + seoScore + accessibilityScore + performanceScore) / 4;

  return {
    file: filePath,
    structuralScore: Number(structuralScore.toFixed(2)),
    seoScore: Number(seoScore.toFixed(2)),
    accessibilityScore: Number(accessibilityScore.toFixed(2)),
    performanceScore: Number(performanceScore.toFixed(2)),
    overallScore: Number(overall.toFixed(2))
  };
}

function run() {
  const htmlFiles = findHtmlFiles(process.cwd());
  const reports = htmlFiles.map(analyzeFile);
  const average = reports.reduce((sum, r) => sum + r.overallScore, 0) / (reports.length || 1);
  const report = { files: reports, overallScore: Number(average.toFixed(2)) };
  fs.writeFileSync('analysis-report.json', JSON.stringify(report, null, 2));
  console.log('Analysis complete. Overall score:', report.overallScore);
}

if (require.main === module) {
  run();
}

module.exports = { run };
