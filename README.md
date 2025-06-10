# Abraham of London Website

This repository contains the source code for the **Abraham of London** website. The site showcases Abraham's work, projects and blog content.

## Directory overview

- `index.html` – main landing page
- `styles.css` – sitewide styles
- `scripts.js` – JavaScript used across pages
- `fathering/` – articles and memoir content about fatherhood
- `Project-documentation/` – notes and setup files for development
- `Tests/` – example CI configuration and function tests
- `tests/` – Jest unit tests for JavaScript
- `netlify.toml` – Netlify deployment configuration

## Running tests

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the Jest test suite:
   ```bash
   npm test
   ```

## Deployment

The project is configured for Netlify. The `netlify.toml` file in the repository root publishes the current directory.

To deploy:
1. Push changes to the main branch on GitHub.
2. Connect the repository to Netlify.
3. Netlify will use `netlify.toml` to serve the site from the root directory.

