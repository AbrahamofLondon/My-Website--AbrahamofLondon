# Abraham of London

A modern personal website for Abraham of London. Below are key features, setup instructions and deployment notes extracted from `Project-documentation/directory.test.js`.

## Features
- **Modern Dark Theme** - Professional design with deep blues and gold accents
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Interactive Elements** - Smooth animations, hover effects, and glass morphism
- **Video Integration** - Custom video player interface for fathering content
- **Contact Forms** - Functional contact and newsletter subscription forms
- **SEO Optimized** - Proper meta tags, semantic HTML, and accessibility features

## Quick Start
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
   npm ci
   ```

3. **Run tests**
   ```bash
   npm test
   ```

4. **Start development server** (optional)
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js http-server
   npx http-server

   # Using VS Code Live Server
   # Right-click index.html and choose "Open with Live Server"
   ```

5. **Open in browser**
   Navigate to `http://localhost:8000` or your chosen local server URL.

## Testing
The project uses Jest with jsdom for DOM manipulation tests.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

Test files are located in the `tests/` directory.

## Deployment
### GitHub Pages / Netlify
Deployment is automated via [GitHub Actions](.github/workflows/static.yml):
1. Automatic deployment on push to the `main` branch
2. Dependency installation and test running
3. Static file deployment to GitHub Pages

### WordPress Integration
For a Docker-based WordPress setup, see the [Update](Update) script:
```bash
chmod +x Update
./Update
```
**Security Note:** update default credentials before production use.

### Manual Deployment
For other hosts:
1. Build the project (if using build tools)
2. Upload files to your web server
3. Configure the server to serve `index.html` by default

