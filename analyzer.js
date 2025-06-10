#!/usr/bin/env node

/**
 * Abraham of London Website Analyzer
 * Standalone HTML/CSS/JS analyzer that works without external dependencies
 * Can be run with: node analyzer.js
 */

const fs = require('fs');
const path = require('path');

class WebsiteAnalyzer {
    constructor() {
        this.results = {
            structure: {},
            design: {},
            content: {},
            performance: {},
            seo: {},
            accessibility: {}
        };
        this.score = 0;
        this.issues = [];
        this.recommendations = [];
    }

    analyze() {
        console.log('🔍 Starting Abraham of London Website Analysis...\n');
        
        try {
            this.analyzeHTMLStructure();
            this.analyzeCSS();
            this.analyzeContent();
            this.analyzeSEO();
            this.analyzeAccessibility();
            this.analyzePerformance();
            this.generateReport();
        } catch (error) {
            console.error('❌ Analysis failed:', error.message);
            process.exit(1);
        }
    }

    analyzeHTMLStructure() {
        console.log('📄 Analyzing HTML Structure...');
        
        const indexPath = path.join(process.cwd(), 'index.html');
        const contactPath = path.join(process.cwd(), 'contact.html');
        const blogPath = path.join(process.cwd(), 'fathering', 'blog', 'index.html');
        
        const files = [
            { name: 'index.html', path: indexPath },
            { name: 'contact.html', path: contactPath },
            { name: 'blog/index.html', path: blogPath }
        ];

        let totalScore = 0;
        let analyzedFiles = 0;

        files.forEach(file => {
            if (fs.existsSync(file.path)) {
                const content = fs.readFileSync(file.path, 'utf8');
                const analysis = this.analyzeHTMLFile(content, file.name);
                this.results.structure[file.name] = analysis;
                totalScore += analysis.score;
                analyzedFiles++;
                
                console.log(`   ✅ ${file.name}: ${analysis.score}/100`);
                if (analysis.issues.length > 0) {
                    analysis.issues.forEach(issue => {
                        console.log(`      ⚠️  ${issue}`);
                        this.issues.push(`${file.name}: ${issue}`);
                    });
                }
            } else {
                console.log(`   ❌ ${file.name}: File not found`);
                this.issues.push(`Missing file: ${file.name}`);
            }
        });

        this.results.structure.averageScore = analyzedFiles > 0 ? Math.round(totalScore / analyzedFiles) : 0;
        console.log(`   📊 Structure Score: ${this.results.structure.averageScore}/100\n`);
    }

    analyzeHTMLFile(content, filename) {
        const analysis = {
            score: 0,
            issues: [],
            features: []
        };

        // Check for DOCTYPE
        if (content.includes('<!DOCTYPE html>')) {
            analysis.score += 15;
            analysis.features.push('Valid DOCTYPE');
        } else {
            analysis.issues.push('Missing DOCTYPE declaration');
        }

        // Check for duplicate DOCTYPE (known issue)
        const doctypeMatches = content.match(/<!DOCTYPE\s+html>/gi);
        if (doctypeMatches && doctypeMatches.length > 1) {
            analysis.issues.push(`Multiple DOCTYPE declarations found (${doctypeMatches.length})`);
            analysis.score -= 10;
        }

        // Check for semantic HTML5 elements
        const semanticElements = ['<nav', '<main', '<section', '<article', '<aside', '<header', '<footer'];
        let semanticCount = 0;
        semanticElements.forEach(element => {
            if (content.includes(element)) {
                semanticCount++;
            }
        });
        
        if (semanticCount >= 4) {
            analysis.score += 20;
            analysis.features.push(`${semanticCount} semantic elements`);
        } else {
            analysis.issues.push(`Only ${semanticCount} semantic elements found (need 4+)`);
        }

        // Check for meta tags
        if (content.includes('<meta charset="UTF-8">')) {
            analysis.score += 10;
            analysis.features.push('UTF-8 charset');
        } else {
            analysis.issues.push('Missing charset meta tag');
        }

        if (content.includes('<meta name="viewport"')) {
            analysis.score += 15;
            analysis.features.push('Responsive viewport');
        } else {
            analysis.issues.push('Missing viewport meta tag');
        }

        // Check for title
        const titleMatch = content.match(/<title>(.*?)<\/title>/i);
        if (titleMatch && titleMatch[1].trim().length > 0) {
            analysis.score += 10;
            analysis.features.push(`Title: "${titleMatch[1].trim()}"`);
        } else {
            analysis.issues.push('Missing or empty title tag');
        }

        // Check for duplicate IDs
        const idMatches = content.match(/id="([^"]+)"/g);
        if (idMatches) {
            const ids = idMatches.map(match => match.match(/id="([^"]+)"/)[1]);
            const uniqueIds = [...new Set(ids)];
            if (ids.length !== uniqueIds.size) {
                analysis.issues.push(`Duplicate IDs found: ${ids.length - uniqueIds.size} duplicates`);
                analysis.score -= 5;
            } else {
                analysis.score += 10;
                analysis.features.push('No duplicate IDs');
            }
        }

        // Check for proper heading hierarchy
        const h1Matches = content.match(/<h1[^>]*>/g);
        if (h1Matches) {
            if (h1Matches.length === 1) {
                analysis.score += 10;
                analysis.features.push('Proper H1 usage');
            } else {
                analysis.issues.push(`${h1Matches.length} H1 tags found (should be 1)`);
            }
        } else {
            analysis.issues.push('No H1 tag found');
        }

        // Check for form labels
        const inputs = content.match(/<input[^>]*>/g) || [];
        const textareas = content.match(/<textarea[^>]*>/g) || [];
        const selects = content.match(/<select[^>]*>/g) || [];
        const totalFormElements = inputs.length + textareas.length + selects.length;
        
        if (totalFormElements > 0) {
            const labels = content.match(/<label[^>]*>/g) || [];
            const ariaLabels = content.match(/aria-label="[^"]*"/g) || [];
            const placeholders = content.match(/placeholder="[^"]*"/g) || [];
            const labelCount = labels.length + ariaLabels.length + placeholders.length;
            
            if (labelCount >= totalFormElements) {
                analysis.score += 10;
                analysis.features.push('All form elements labeled');
            } else {
                analysis.issues.push(`${totalFormElements - labelCount} form elements missing labels`);
            }
        }

        // Check for truncated content (known issue)
        if (content.length < 1000) {
            analysis.issues.push('File appears truncated (very short content)');
            analysis.score -= 15;
        }

        // Check for embedded content within file (known issue)
        const htmlMatches = content.match(/<html[^>]*>/g);
        if (htmlMatches && htmlMatches.length > 1) {
            analysis.issues.push('Multiple HTML tags found - embedded content detected');
            analysis.score -= 20;
        }

        return analysis;
    }

    analyzeCSS() {
        console.log('🎨 Analyzing CSS...');
        
        const stylePath = path.join(process.cwd(), 'styles.css');
        let cssScore = 0;
        
        if (fs.existsSync(stylePath)) {
            const cssContent = fs.readFileSync(stylePath, 'utf8');
            
            // Check for CSS custom properties (dark theme implementation)
            if (cssContent.includes('--primary-color') && cssContent.includes('--gold-accent')) {
                cssScore += 25;
                this.results.design.darkTheme = true;
                console.log('   ✅ Dark theme with CSS custom properties');
            } else {
                this.issues.push('Dark theme CSS variables not found');
            }

            // Check for responsive design
            if (cssContent.includes('@media') || cssContent.includes('grid') || cssContent.includes('flex')) {
                cssScore += 25;
                this.results.design.responsive = true;
                console.log('   ✅ Responsive design patterns found');
            } else {
                this.issues.push('No responsive design patterns detected');
            }

            // Check for modern CSS features
            if (cssContent.includes('backdrop-filter') || cssContent.includes('gradient')) {
                cssScore += 20;
                this.results.design.modern = true;
                console.log('   ✅ Modern CSS features (gradients, backdrop-filter)');
            }

            // Check for animations/transitions
            if (cssContent.includes('transition') || cssContent.includes('animation')) {
                cssScore += 15;
                this.results.design.animations = true;
                console.log('   ✅ CSS animations and transitions');
            }

            // Check if CSS is complete (not truncated)
            if (cssContent.length > 5000) {
                cssScore += 15;
                console.log('   ✅ Comprehensive CSS file');
            } else {
                this.issues.push('CSS file appears incomplete or minimal');
            }

        } else {
            this.issues.push('styles.css file not found');
            console.log('   ❌ styles.css: File not found');
        }

        this.results.design.score = cssScore;
        console.log(`   📊 Design Score: ${cssScore}/100\n`);
    }

    analyzeContent() {
        console.log('📝 Analyzing Content Quality...');
        
        const indexPath = path.join(process.cwd(), 'index.html');
        let contentScore = 0;

        if (fs.existsSync(indexPath)) {
            const content = fs.readFileSync(indexPath, 'utf8');
            
            // Remove HTML tags for text analysis
            const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
            
            // Word count
            const wordCount = textContent.split(' ').length;
            if (wordCount > 500) {
                contentScore += 20;
                console.log(`   ✅ Substantial content: ${wordCount} words`);
            } else {
                this.issues.push(`Low word count: ${wordCount} words (need 500+)`);
            }

            // Check for key terms related to Abraham of London
            const keyTerms = ['Abraham', 'strategist', 'consultant', 'leadership', 'fathering', 'London'];
            const foundTerms = keyTerms.filter(term => 
                textContent.toLowerCase().includes(term.toLowerCase())
            );
            
            contentScore += Math.min(foundTerms.length * 5, 25);
            console.log(`   ✅ Key terms found: ${foundTerms.join(', ')}`);

            // Check for contact information
            if (content.includes('@') || content.includes('phone') || content.includes('email')) {
                contentScore += 15;
                console.log('   ✅ Contact information present');
            } else {
                this.issues.push('No contact information found');
            }

            // Check for call-to-action elements
            if (content.includes('contact') || content.includes('cta') || content.includes('button')) {
                contentScore += 15;
                console.log('   ✅ Call-to-action elements found');
            }

            // Check for social proof elements
            if (content.includes('testimonial') || content.includes('client') || content.includes('case')) {
                contentScore += 10;
                console.log('   ✅ Social proof elements detected');
            }

            // Check for blog/content structure
            const blogPath = path.join(process.cwd(), 'fathering', 'blog', 'index.html');
            if (fs.existsSync(blogPath)) {
                contentScore += 15;
                console.log('   ✅ Blog structure exists');
            } else {
                this.issues.push('Blog structure missing');
            }

        } else {
            this.issues.push('index.html not found for content analysis');
        }

        this.results.content.score = contentScore;
        console.log(`   📊 Content Score: ${contentScore}/100\n`);
    }

    analyzeSEO() {
        console.log('🔍 Analyzing SEO...');
        
        const indexPath = path.join(process.cwd(), 'index.html');
        let seoScore = 0;

        if (fs.existsSync(indexPath)) {
            const content = fs.readFileSync(indexPath, 'utf8');

            // Check for meta description
            if (content.includes('<meta name="description"')) {
                seoScore += 20;
                console.log('   ✅ Meta description present');
            } else {
                this.issues.push('Missing meta description');
            }

            // Check for Open Graph tags
            if (content.includes('og:title') || content.includes('og:description')) {
                seoScore += 15;
                console.log('   ✅ Open Graph tags found');
            } else {
                this.issues.push('Missing Open Graph tags');
            }

            // Check for structured data
            if (content.includes('application/ld+json') || content.includes('schema.org')) {
                seoScore += 20;
                console.log('   ✅ Structured data present');
            } else {
                this.issues.push('No structured data found');
                this.recommendations.push('Add JSON-LD structured data for Person and ProfessionalService');
            }

            // Check for proper heading structure
            const headings = content.match(/<h[1-6][^>]*>/g) || [];
            if (headings.length >= 3) {
                seoScore += 15;
                console.log(`   ✅ Good heading structure: ${headings.length} headings`);
            } else {
                this.issues.push('Insufficient heading structure for SEO');
            }

            // Check for image alt tags
            const images = content.match(/<img[^>]*>/g) || [];
            const alts = content.match(/alt="[^"]*"/g) || [];
            if (images.length === 0 || alts.length >= images.length * 0.8) {
                seoScore += 15;
                console.log('   ✅ Good image alt tag coverage');
            } else {
                this.issues.push(`${images.length - alts.length} images missing alt tags`);
            }

            // Check for internal links
            const internalLinks = content.match(/href="#([^"]*)"/g) || [];
            if (internalLinks.length >= 5) {
                seoScore += 15;
                console.log(`   ✅ Good internal linking: ${internalLinks.length} links`);
            } else {
                this.issues.push('Limited internal linking structure');
            }

        }

        this.results.seo.score = seoScore;
        console.log(`   📊 SEO Score: ${seoScore}/100\n`);
    }

    analyzeAccessibility() {
        console.log('♿ Analyzing Accessibility...');
        
        const indexPath = path.join(process.cwd(), 'index.html');
        let a11yScore = 0;

        if (fs.existsSync(indexPath)) {
            const content = fs.readFileSync(indexPath, 'utf8');

            // Check for proper form labels
            const forms = content.match(/<form[^>]*>/g) || [];
            if (forms.length > 0) {
                const labels = content.match(/<label[^>]*>/g) || [];
                const ariaLabels = content.match(/aria-label="[^"]*"/g) || [];
                if (labels.length > 0 || ariaLabels.length > 0) {
                    a11yScore += 25;
                    console.log('   ✅ Form labels present');
                } else {
                    this.issues.push('Forms missing proper labels');
                }
            } else {
                a11yScore += 10; // No forms to check
            }

            // Check for ARIA attributes
            if (content.includes('aria-') || content.includes('role=')) {
                a11yScore += 20;
                console.log('   ✅ ARIA attributes found');
            } else {
                this.issues.push('Limited ARIA implementation');
            }

            // Check for proper heading hierarchy
            const h1 = content.match(/<h1[^>]*>/g) || [];
            const h2 = content.match(/<h2[^>]*>/g) || [];
            if (h1.length === 1 && h2.length > 0) {
                a11yScore += 20;
                console.log('   ✅ Proper heading hierarchy');
            } else {
                this.issues.push('Heading hierarchy issues');
            }

            // Check for focus management
            if (content.includes('tabindex') || content.includes('focus')) {
                a11yScore += 15;
                console.log('   ✅ Focus management implemented');
            }

            // Check for skip links
            if (content.includes('skip') && content.includes('main')) {
                a11yScore += 10;
                console.log('   ✅ Skip links found');
            } else {
                this.recommendations.push('Add skip navigation links');
            }

            // Check color contrast indicators (dark theme)
            if (content.includes('dark') || this.results.design.darkTheme) {
                a11yScore += 10;
                console.log('   ✅ Dark theme with good contrast potential');
            }

        }

        this.results.accessibility.score = a11yScore;
        console.log(`   📊 Accessibility Score: ${a11yScore}/100\n`);
    }

    analyzePerformance() {
        console.log('⚡ Analyzing Performance Indicators...');
        
        let perfScore = 0;

        // Check file sizes
        const fileSizes = this.checkFileSizes();
        if (fileSizes.total < 2048) { // Less than 2MB total
            perfScore += 20;
            console.log(`   ✅ Good total file size: ${fileSizes.total}KB`);
        } else {
            this.issues.push(`Large total file size: ${fileSizes.total}KB`);
        }

        // Check for optimization indicators
        const indexPath = path.join(process.cwd(), 'index.html');
        if (fs.existsSync(indexPath)) {
            const content = fs.readFileSync(indexPath, 'utf8');

            // Check for async/defer scripts
            if (content.includes('async') || content.includes('defer')) {
                perfScore += 15;
                console.log('   ✅ Async/defer script loading');
            } else {
                this.recommendations.push('Add async/defer to script tags');
            }

            // Check for preload hints
            if (content.includes('preload') || content.includes('prefetch')) {
                perfScore += 15;
                console.log('   ✅ Resource preloading hints');
            } else {
                this.recommendations.push('Add preload hints for critical resources');
            }

            // Check for lazy loading
            if (content.includes('loading="lazy"')) {
                perfScore += 10;
                console.log('   ✅ Lazy loading implemented');
            } else {
                this.recommendations.push('Implement lazy loading for images');
            }

            // Check for minimal external dependencies
            const externalScripts = content.match(/src="https?:\/\/[^"]*"/g) || [];
            if (externalScripts.length <= 5) {
                perfScore += 15;
                console.log(`   ✅ Minimal external dependencies: ${externalScripts.length}`);
            } else {
                this.issues.push(`Many external dependencies: ${externalScripts.length}`);
            }

            // Check for compression indicators
            if (content.length < 50000) { // Less than 50KB HTML
                perfScore += 15;
                console.log(`   ✅ Compact HTML: ${Math.round(content.length/1024)}KB`);
            }

            // Check for modern CSS (grid/flexbox for efficiency)
            const cssPath = path.join(process.cwd(), 'styles.css');
            if (fs.existsSync(cssPath)) {
                const cssContent = fs.readFileSync(cssPath, 'utf8');
                if (cssContent.includes('grid') || cssContent.includes('flex')) {
                    perfScore += 10;
                    console.log('   ✅ Modern CSS layout methods');
                }
            }
        }

        this.results.performance.score = perfScore;
        console.log(`   📊 Performance Score: ${perfScore}/100\n`);
    }

    checkFileSizes() {
        const files = [
            'index.html',
            'contact.html',
            'styles.css',
            'scripts.js'
        ];

        let totalSize = 0;
        const sizes = {};

        files.forEach(file => {
            const filePath = path.join(process.cwd(), file);
            if (fs.existsSync(filePath)) {
                const stats = fs.statSync(filePath);
                const sizeKB = Math.round(stats.size / 1024);
                sizes[file] = sizeKB;
                totalSize += sizeKB;
            }
        });

        return { ...sizes, total: totalSize };
    }

    generateReport() {
        console.log('📊 ABRAHAM OF LONDON WEBSITE ANALYSIS REPORT');
        console.log('='.repeat(50));
        
        // Calculate overall score
        const scores = [
            this.results.structure.averageScore || 0,
            this.results.design.score || 0,
            this.results.content.score || 0,
            this.results.seo.score || 0,
            this.results.accessibility.score || 0,
            this.results.performance.score || 0
        ];
        
        this.score = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        
        console.log(`\n🎯 OVERALL SCORE: ${this.score}/100`);
        
        if (this.score >= 85) {
            console.log('🎉 EXCELLENT - Website is in great shape!');
        } else if (this.score >= 70) {
            console.log('👍 GOOD - Minor improvements needed');
        } else if (this.score >= 50) {
            console.log('⚠️  NEEDS WORK - Several issues to address');
        } else {
            console.log('🔴 CRITICAL - Major improvements required');
        }

        console.log('\n📈 CATEGORY BREAKDOWN:');
        console.log(`   📄 HTML Structure: ${this.results.structure.averageScore || 0}/100`);
        console.log(`   🎨 Design & CSS: ${this.results.design.score || 0}/100`);
        console.log(`   📝 Content Quality: ${this.results.content.score || 0}/100`);
        console.log(`   🔍 SEO Optimization: ${this.results.seo.score || 0}/100`);
        console.log(`   ♿ Accessibility: ${this.results.accessibility.score || 0}/100`);
        console.log(`   ⚡ Performance: ${this.results.performance.score || 0}/100`);

        if (this.issues.length > 0) {
            console.log('\n⚠️  ISSUES FOUND:');
            this.issues.forEach((issue, index) => {
                console.log(`   ${index + 1}. ${issue}`);
            });
        }

        if (this.recommendations.length > 0) {
            console.log('\n💡 RECOMMENDATIONS:');
            this.recommendations.forEach((rec, index) => {
                console.log(`   ${index + 1}. ${rec}`);
            });
        }

        console.log('\n🎯 NEXT STEPS:');
        if (this.score < 70) {
            console.log('   1. Fix critical structural issues first');
            console.log('   2. Implement missing SEO elements');
            console.log('   3. Improve accessibility compliance');
        } else {
            console.log('   1. Address remaining minor issues');
            console.log('   2. Optimize performance further');
            console.log('   3. Enhance content and SEO');
        }

        console.log('\n✨ Run this analyzer regularly to track improvements!');
        console.log(`📅 Analysis completed: ${new Date().toLocaleString()}`);
        
        // Save results to file
        this.saveResults();
    }

    saveResults() {
        const reportData = {
            timestamp: new Date().toISOString(),
            overallScore: this.score,
            categoryScores: {
                structure: this.results.structure.averageScore || 0,
                design: this.results.design.score || 0,
                content: this.results.content.score || 0,
                seo: this.results.seo.score || 0,
                accessibility: this.results.accessibility.score || 0,
                performance: this.results.performance.score || 0
            },
            issues: this.issues,
            recommendations: this.recommendations,
            details: this.results
        };

        try {
            fs.writeFileSync('analysis-report.json', JSON.stringify(reportData, null, 2));
            console.log('\n💾 Detailed report saved to: analysis-report.json');
        } catch (error) {
            console.log('\n⚠️  Could not save report file:', error.message);
        }
    }
}

// CLI execution
if (require.main === module) {
    const analyzer = new WebsiteAnalyzer();
    analyzer.analyze();
}

module.exports = WebsiteAnalyzer;
