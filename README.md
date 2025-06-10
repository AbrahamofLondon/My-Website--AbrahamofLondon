# Abraham of London - Personal Website

A sophisticated, modern website showcasing Abraham of London's expertise as a visionary strategist, author, and thought leader. Features a dark theme with gold accents, responsive design, and comprehensive sections covering business ventures and fathering insights.

## 🌟 Features

- **Modern Dark Theme** - Professional design with deep blues and gold accents
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Interactive Elements** - Smooth animations, hover effects, and glass morphism
- **Video Integration** - Custom video player interface for fathering content
- **Contact Forms** - Functional contact and newsletter subscription forms
- **SEO Optimized** - Proper meta tags, semantic HTML, and accessibility features

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd abraham-of-london
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run tests**
   ```bash
   npm test
   ```
4. **Start development server** (if using a local server)
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js http-server
   npx http-server

   # Using Live Server extension in VS Code
   # Right-click index.html and select "Open with Live Server"
   ```
5. **Open in browser**
   Navigate to `http://localhost:8000` or your local server URL

## 📁 Project Structure
```text
abraham-of-london/
├── index.html              # Main homepage
├── styles.css              # Global stylesheet (dark theme)
├── scripts.js              # JavaScript utilities
├── package.json            # Node.js dependencies
├── .github/
│   └── workflows/
│       └── static.yml       # GitHub Actions deployment
├── fathering/
│   ├── index.html          # Fathering section
│   └── blog/
│       ├── index.html      # Blog homepage
│       └── fiction.index.html # Fiction blog
├── tests/                  # Jest test files
└── Update                  # WordPress deployment script
```

## 🎨 Design System

### Color Palette
- **Primary**: `#1a1a2e` (Deep navy)
- **Secondary**: `#16213e` (Dark blue)
- **Accent**: `#0f3460` (Medium blue)
- **Gold**: `#d4af37` (Gold accent)
- **Text Light**: `#e94560` (Coral)
- **Text White**: `#ffffff`
- **Text Gray**: `#b8b8b8`

### Typography
- **Headers**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

### Gradients
- **Primary**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Secondary**: `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`
- **Tertiary**: `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`

## 🧪 Testing

The project uses Jest for testing with jsdom for DOM manipulation testing.

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Files
- Tests are located in the `tests/` directory
- Test files follow the pattern `*.test.js`
- DOM-related tests use jsdom environment

## 🚀 Deployment

### GitHub Pages / Netlify
The site is configured for static hosting and includes a GitHub Actions workflow:
1. **Automatic deployment** on push to main branch
2. **Dependency installation** and test running
3. **Static file deployment** to GitHub Pages

### Manual Deployment
For other hosting providers:
1. **Build the project** (if using build tools)
2. **Upload files** to your web server
3. **Configure server** to serve `index.html` as default

### WordPress Integration
The `Update` script provides Docker-based WordPress setup:
```bash
# Make script executable
chmod +x Update

# Run WordPress setup
./Update
```
**⚠️ Security Note**: Update default credentials before production use.

## 🔧 Configuration

### Environment Variables
For production deployment, set these environment variables:
```bash
# WordPress Configuration (if using Update script)
MYSQL_ROOT_PASSWORD=your_secure_password
WORDPRESS_DB_PASSWORD=your_db_password
WORDPRESS_ADMIN_EMAIL=your_email@domain.com
```

### Contact Form
The contact form is currently configured for client-side validation. For production:
1. **Add server-side processing** for form submissions
2. **Configure email service** (SendGrid, Mailgun, etc.)
3. **Add CSRF protection** and spam filtering

## 📱 Browser Support
- **Modern browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **Mobile browsers**: iOS Safari 12+, Chrome Mobile 60+
- **Features used**: CSS Grid, Flexbox, CSS Custom Properties, ES6+

## 🤝 Contributing
1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### Code Standards
- Use semantic HTML5 elements
- Follow BEM methodology for CSS classes
- Use ES6+ JavaScript features
- Maintain accessibility standards (WCAG 2.1)
- Test across different devices and browsers

## 🐛 Known Issues
1. **Blog pages contain duplicated content** - Needs cleanup
2. **Some HTML files have structural issues** - Requires refactoring
3. **Contact form needs backend integration** - Currently client-side only
4. **Video player is simulated** - Replace with actual video content

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or support:
- **Email**: info@abrahamoflondon.com
- **Phone**: +44 20 86225909
- **Location**: London, United Kingdom

## 🔄 Changelog

### Version 1.0.0 (Current)
- Initial release with dark theme
- Responsive design implementation
- Contact forms and video integration
- SEO optimization and accessibility features

---

**Built with ❤️ in London**
