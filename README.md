# Abraham of London - Personal Website

A modern website showcasing Abraham of London as a strategist, author and thought leader. The site uses a dark theme with gold accents and is optimized for different devices. It also contains a WordPress deployment script for advanced hosting scenarios.

## 🌟 Features

- **Modern Dark Theme** with gold highlights
- **Responsive Design** for desktop, tablet and mobile
- **Interactive Elements** including smooth scroll and animations
- **Video Integration** for fathering content
- **Contact & Newsletter Forms**
- **SEO Optimized** with semantic HTML and accessibility best practices

## 🚀 Quick Start

### Prerequisites

- Node.js 14+
- npm (or yarn)
- A modern web browser

### Installation

```bash
# Clone repository
git clone <repository-url>
cd abraham-of-london

# Install dependencies
npm install

# Run tests (optional)
npm test
```

### Development server

You can serve the site locally with any static file server. Examples:

```bash
# Python
python -m http.server 8000

# Node.js http-server
npx http-server
```

Then open `http://localhost:8000` in your browser.

## 📁 Project Structure

```
./
├── index.html                # Home page
├── styles.css                # Global styles
├── scripts.js                # JavaScript utilities
├── fathering/                # Fathering content and blog
├── tests/                    # Jest tests
├── Update                    # WordPress deployment script
└── .github/workflows/static.yml # GitHub Pages deployment
```

## 🎨 Design System

- **Primary** `#1a1a2e`
- **Secondary** `#16213e`
- **Accent** `#0f3460`
- **Gold** `#d4af37`
- **Fonts** Playfair Display & Inter

## 🧪 Testing

Tests run with [Jest](https://jestjs.io/) and the jsdom environment.

```bash
npm test             # Run all tests
npm run test:watch   # Watch mode
npm run test:coverage
```

## 🚀 Deployment

The repository includes a GitHub Actions workflow that installs dependencies, runs tests and deploys the site to GitHub Pages. For WordPress based hosting, see the `Update` script which uses Docker.

## 🔧 Configuration

Environment variables for WordPress deployment:

```bash
MYSQL_ROOT_PASSWORD=your_secure_password
WORDPRESS_DB_PASSWORD=your_db_password
WORDPRESS_ADMIN_EMAIL=your_email@domain.com
```

## 📱 Browser Support

Chrome 60+, Firefox 60+, Safari 12+, Edge 79+ and modern mobile browsers.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and open a pull request

Please use semantic HTML, follow BEM for CSS and keep accessibility in mind.

## 🐛 Known Issues

1. Blog pages contain duplicated content
2. Some HTML files need structural cleanup
3. Contact form requires backend integration
4. Video player uses placeholder content

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: info@abrahamoflondon.org
- **Phone**: +44 20 8622 5909
- **Location**: London, United Kingdom

## 🔄 Changelog

### 1.0.0
- Initial release

---

Built with ❤️ in London
