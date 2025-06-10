/**
 * @jest-environment node
 */

const fs = require('fs');
const WebsiteAnalyzer = require('../analyzer');

describe('WebsiteAnalyzer', () => {
  const reportPath = 'analysis-report.json';

  beforeEach(() => {
    if (fs.existsSync(reportPath)) {
      fs.unlinkSync(reportPath);
    }
  });

  test('generates analysis-report.json with overallScore', () => {
    const analyzer = new WebsiteAnalyzer();
    analyzer.analyze();
    expect(fs.existsSync(reportPath)).toBe(true);
    const data = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    expect(data).toHaveProperty('overallScore');
    expect(typeof data.overallScore).toBe('number');
  });
});
