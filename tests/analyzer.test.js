const fs = require('fs');
const { execSync } = require('child_process');

beforeAll(() => {
  if (fs.existsSync('analysis-report.json')) {
    fs.unlinkSync('analysis-report.json');
  }
});

test('analyzer generates report with overallScore', () => {
  execSync('node analyzer.js');
  const report = JSON.parse(fs.readFileSync('analysis-report.json', 'utf-8'));
  expect(report).toHaveProperty('overallScore');
});
