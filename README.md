# Abraham of London Website

This repository contains the source for the **Abraham of London** static website. It features the author's memoir, blog posts, and additional creative writing.

## Directory overview

```
your-site/
├── index.html                 ✅ (Main Abraham of London site)
├── styles.css                 ✅ (Site styles)
├── scripts.js                 ✅ (JavaScript logic)
├── fathering/
│   ├── memoir.index.html      ✅ (Memoir page)
│   ├── blog/
│   │   ├── index.html         ✅ (Blog homepage)
│   │   └── fiction.index.html ✅ (Short fiction post)
│   └── Fictional-Romance/
│       └── index.html         ✅ (Romance fiction page)
```

- `index.html` – home page of the site
- `styles.css` – shared styling across pages
- `scripts.js` – JavaScript for smooth scrolling and updating the footer year
- `fathering/` – subsite with a blog, fiction piece, and memoir page
- `tests/` – Jest tests validating `scripts.js`

## Testing

Install dependencies and run the Jest suite:

```bash
npm install
npm test
```

## Deployment

The site is configured for static hosting. `netlify.toml` defines the root directory:

```toml
[build]
  publish = "."
  command = ""
```

This repository also contains a GitHub Actions workflow (`.github/workflows/static.yml`) that installs dependencies, runs tests, and deploys the contents to GitHub Pages on every push to `main`.
