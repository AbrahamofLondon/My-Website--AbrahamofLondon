# Abraham of London Website

This repository contains the source code for the **Abraham of London** website. It includes the static pages, styles and scripts used to build the site along with test configuration and deployment workflows.

## Folder structure

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

Other files include GitHub Actions workflows in the `Tests` directory, project documentation and shell scripts for more advanced deployments.

## Running tests

Unit tests are written with [Jest](https://jestjs.io/). Install dependencies and run the test suite with:

```bash
npm install
npm test
```

## Deployment

The project is configured for static hosting. Two common approaches are supported:

- **GitHub Pages** – A workflow in `Tests/Test- and -Deploy.yml` builds the site and uses `actions/deploy-pages` to publish from the `main` branch.
- **Netlify** – A basic `netlify.toml` is provided for deploying the contents of this repository directly.

Simply push changes to the `main` branch to trigger the GitHub Pages deployment, or connect the repository to Netlify for automatic builds.
