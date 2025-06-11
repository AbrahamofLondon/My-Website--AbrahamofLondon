# Abraham of London Website

This repository contains a small static site with accompanying test scripts. The site is written in plain HTML, CSS and JavaScript and showcases various pages related to the author "Abraham of London".

## Directory Structure

```
.
├── index.html               # Main site entry
├── styles.css               # Shared styles
├── scripts.js               # JavaScript used across pages
├── fathering/               # Subsection with memoir and blog posts
│   ├── memoir.index.html
│   ├── Fictional-Romance/
│   │   └── index.html
│   └── blog/
│       ├── index.html
│       └── fiction.index.html
├── Tests/                   # GitHub workflow and JS tests
├── tests/                   # Jest unit tests for scripts.js
└── Project-documentation/   # Additional project notes and tests
```

Other files include `netlify.toml`, `sitemap.xml` and a `LICENSE` under the MIT license.

## Local Preview

1. Clone the repository.
2. Open any of the HTML files in your browser (e.g. double-click `index.html` or use `open index.html` on macOS/Linux). The site does not require a web server for simple preview.

## Running Tests

Tests are written using [Jest](https://jestjs.io/).

```
npm install    # Install dependencies
npm test       # Run the Jest test suite
```

The GitHub Actions workflow (`.github/workflows/static.yml`) will automatically run these tests on each push.

