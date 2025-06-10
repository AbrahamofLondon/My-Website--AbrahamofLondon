#!/usr/bin/env node

/**
 * Asset Creation Script for Abraham of London Website
 * Creates placeholder files for favicon and images to resolve missing path issues
 */

const fs = require('fs');
const path = require('path');

class AssetCreator {
    constructor() {
        this.assetsDir = path.join(process.cwd(), 'assets');
        this.faviconDir = path.join(this.assetsDir, 'favicon');
        this.imagesDir = path.join(this.assetsDir, 'images');
    }

    createDirectories() {
        console.log('📁 Creating asset directories...');

        // Create main assets directory
        if (!fs.existsSync(this.assetsDir)) {
            fs.mkdirSync(this.assetsDir);
            console.log('   ✅ Created assets/');
        }

        // Create favicon subdirectory
        if (!fs.existsSync(this.faviconDir)) {
            fs.mkdirSync(this.faviconDir);
            console.log('   ✅ Created assets/favicon/');
        }

        // Create images subdirectory
        if (!fs.existsSync(this.imagesDir)) {
            fs.mkdirSync(this.imagesDir);
            console.log('   ✅ Created assets/images/');
        }
    }

    createFavicon() {
        console.log('🎨 Creating favicon files...');

        // Create a minimal favicon.ico (16x16 transparent)
        const faviconPath = path.join(this.faviconDir, 'favicon.ico');

        // ICO file header for 16x16 transparent icon
        const icoHeader = Buffer.from([
            0x00, 0x00, // Reserved
            0x01, 0x00, // ICO format
            0x01, 0x00, // Number of images
            0x10, 0x10, // Width/Height (16x16)
            0x00,       // Color count (0 = no palette)
            0x00,       // Reserved
            0x01, 0x00, // Color planes
            0x20, 0x00, // Bits per pixel (32)
            0x80, 0x00, 0x00, 0x00, // Size of image data
            0x16, 0x00, 0x00, 0x00  // Offset to image data
        ]);

        // BMP header + transparent pixel data for 16x16
        const bmpData = Buffer.alloc(128, 0x00); // All transparent pixels

        const faviconData = Buffer.concat([icoHeader, bmpData]);
        fs.writeFileSync(faviconPath, faviconData);

        console.log('   ✅ Created favicon.ico (16x16 transparent)');
    }

    createSVGFiles() {
        console.log('🎨 Creating SVG files...');

        // Abraham of London logo SVG
        const alomaradaLogo = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#d4af37;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f4d03f;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="200" height="60" fill="#1a1a2e" rx="8"/>
  
  <!-- Abraham of London Text -->
  <text x="100" y="25" text-anchor="middle" fill="url(#goldGradient)" 
        font-family="serif" font-size="16" font-weight="bold">
    Abraham of London
  </text>
  
  <!-- Tagline -->
  <text x="100" y="45" text-anchor="middle" fill="#ffffff" 
        font-family="sans-serif" font-size="10" opacity="0.8">
    Visionary • Strategist • Author
  </text>
</svg>`;

        // Fathering Wisdom Foundation badge
        const fwfBadge = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="badgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Badge Circle -->
  <circle cx="40" cy="40" r="35" fill="url(#badgeGradient)" stroke="#d4af37" stroke-width="2"/>
  
  <!-- Inner Circle -->
  <circle cx="40" cy="40" r="25" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  
  <!-- FWF Text -->
  <text x="40" y="35" text-anchor="middle" fill="#ffffff" 
        font-family="serif" font-size="14" font-weight="bold">
    FWF
  </text>
  
  <!-- Foundation text -->
  <text x="40" y="50" text-anchor="middle" fill="#ffffff" 
        font-family="sans-serif" font-size="6" opacity="0.9">
    FOUNDATION
  </text>
</svg>`;

        // Write SVG files
        fs.writeFileSync(path.join(this.imagesDir, 'alomarada-logo.svg'), alomaradaLogo);
        fs.writeFileSync(path.join(this.imagesDir, 'fwf-badge.svg'), fwfBadge);
        
        console.log('   ✅ Created alomarada-logo.svg');
        console.log('   ✅ Created fwf-badge.svg');
    }

    createWebPPlaceholders() {
        console.log('🖼️ Creating WebP placeholder images...');

        // Create minimal WebP files (1x1 transparent pixel)
        // WebP file header for 1x1 transparent image
        const webpHeader = Buffer.from([
            0x52, 0x49, 0x46, 0x46, // "RIFF"
            0x1A, 0x00, 0x00, 0x00, // File size
            0x57, 0x45, 0x42, 0x50, // "WEBP"
            0x56, 0x50, 0x38, 0x4C, // "VP8L"
            0x0E, 0x00, 0x00, 0x00, // Chunk size
            0x2F, 0x00, 0x00, 0x00, // VP8L header
            0x10, 0x88, 0x88, 0x08, // Width/Height (1x1)
            0x00, 0x00 // Data
        ]);

        const webpFiles = [
            'banner.webp',
            'abraham-portrait.webp',
            'abraham-portrait@2x.webp',
            'endureluxe-icon.webp'
        ];

        webpFiles.forEach(filename => {
            const filePath = path.join(this.imagesDir, filename);
            fs.writeFileSync(filePath, webpHeader);
            console.log(`   ✅ Created ${filename} (1x1 transparent)`);
        });
    }

    updateHTMLReferences() {
        console.log('🔗 Updating HTML file references...');

        const htmlFiles = [
            { path: 'index.html', name: 'index.html' },
            { path: 'contact.html', name: 'contact.html' },
            { path: path.join('fathering', 'blog', 'index.html'), name: 'blog/index.html' }
        ];

        htmlFiles.forEach(file => {
            const fullPath = path.join(process.cwd(), file.path);
            
            if (fs.existsSync(fullPath)) {
                let content = fs.readFileSync(fullPath, 'utf8');
                let updated = false;

                // Add favicon reference to head if missing
                if (!content.includes('favicon.ico') && content.includes('<head>')) {
                    content = content.replace(
                        '<head>',
                        `<head>\n    <link rel="icon" type="image/x-icon" href="./assets/favicon/favicon.ico">`
                    );
                    updated = true;
                }

                // Update image src paths to use assets directory
                const imageUpdates = [
                    { from: /src="[^"]*abraham-portrait[^"]*"/g, to: 'src="./assets/images/abraham-portrait.webp"' },
                    { from: /src="[^"]*banner[^"]*"/g, to: 'src="./assets/images/banner.webp"' },
                    { from: /src="[^"]*alomarada-logo[^"]*"/g, to: 'src="./assets/images/alomarada-logo.svg"' },
                    { from: /src="[^"]*endureluxe-icon[^"]*"/g, to: 'src="./assets/images/endureluxe-icon.webp"' },
                    { from: /src="[^"]*fwf-badge[^"]*"/g, to: 'src="./assets/images/fwf-badge.svg"' }
                ];

                imageUpdates.forEach(update => {
                    if (update.from.test(content)) {
                        content = content.replace(update.from, update.to);
                        updated = true;
                    }
                });

                if (updated) {
                    fs.writeFileSync(fullPath, content);
                    console.log(`   ✅ Updated ${file.name}`);
                } else {
                    console.log(`   ℹ️  ${file.name} - no updates needed`);
                }
            } else {
                console.log(`   ⚠️  ${file.name} - file not found`);
            }
        });
    }

    generateAssetManifest() {
        console.log('📋 Generating asset manifest...');

        const manifest = {
            version: "1.0.0",
            generated: new Date().toISOString(),
            assets: {
                favicon: {
                    "favicon.ico": {
                        path: "./assets/favicon/favicon.ico",
                        type: "image/x-icon",
                        size: "16x16",
                        description: "Website favicon"
                    }
                },
                images: {
                    "banner.webp": {
                        path: "./assets/images/banner.webp",
                        type: "image/webp",
                        size: "1x1",
                        description: "Hero banner placeholder"
                    },
                    "abraham-portrait.webp": {
                        path: "./assets/images/abraham-portrait.webp",
                        type: "image/webp",
                        size: "1x1",
                        description: "Abraham portrait photo placeholder"
                    },
                    "abraham-portrait@2x.webp": {
                        path: "./assets/images/abraham-portrait@2x.webp",
                        type: "image/webp",
                        size: "1x1",
                        description: "Abraham portrait photo high-res placeholder"
                    },
                    "alomarada-logo.svg": {
                        path: "./assets/images/alomarada-logo.svg",
                        type: "image/svg+xml",
                        size: "200x60",
                        description: "Abraham of London logo"
                    },
                    "endureluxe-icon.webp": {
                        path: "./assets/images/endureluxe-icon.webp",
                        type: "image/webp",
                        size: "1x1",
                        description: "EndureLuxe brand icon placeholder"
                    },
                    "fwf-badge.svg": {
                        path: "./assets/images/fwf-badge.svg",
                        type: "image/svg+xml",
                        size: "80x80",
                        description: "Fathering Wisdom Foundation badge"
                    }
                }
            },
            usage: {
                "Replace placeholders": "Replace WebP files with actual photos in appropriate sizes",
                "Optimize": "Compress images for web delivery",
                "Responsive": "Consider creating multiple sizes for different screen densities"
            }
        };

        fs.writeFileSync(
            path.join(this.assetsDir, 'manifest.json'),
            JSON.stringify(manifest, null, 2)
        );

        console.log('   ✅ Created assets/manifest.json');
    }

    run() {
        console.log('🎨 Creating Abraham of London Website Assets\n');

        try {
            this.createDirectories();
            this.createFavicon();
            this.createSVGFiles();
            this.createWebPPlaceholders();
            this.updateHTMLReferences();
            this.generateAssetManifest();

            console.log('\n✅ Asset creation completed successfully!');
            console.log('\n📋 Asset Summary:');
            console.log('   📁 assets/favicon/favicon.ico');
            console.log('   📁 assets/images/banner.webp');
            console.log('   📁 assets/images/abraham-portrait.webp');
            console.log('   📁 assets/images/abraham-portrait@2x.webp');
            console.log('   📁 assets/images/alomarada-logo.svg');
            console.log('   📁 assets/images/endureluxe-icon.webp');
            console.log('   📁 assets/images/fwf-badge.svg');
            console.log('   📁 assets/manifest.json');

            console.log('\n🎯 Next Steps:');
            console.log('   1. Replace placeholder images with actual photos');
            console.log('   2. Optimize images for web (compress, resize)');
            console.log('   3. Update alt text in HTML for accessibility');
            console.log('   4. Test image loading in browser');

            console.log('\n💡 Tips:');
            console.log('   • Use WebP format for photos (better compression)');
            console.log('   • Keep SVG files for logos and icons');
            console.log('   • Create @2x versions for high-DPI displays');
            console.log('   • Add lazy loading attributes to images');

        } catch (error) {
            console.error('❌ Asset creation failed:', error.message);
            process.exit(1);
        }
    }
}

// CLI execution
if (require.main === module) {
    const creator = new AssetCreator();
    creator.run();
}

module.exports = AssetCreator;
