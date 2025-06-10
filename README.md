# Abraham of London Website

This repository contains the source code for the personal website of **Abraham of London**. The site showcases Abraham's work as an entrepreneur, strategist and storyteller and includes pages for his business ventures and fathering resources.

## Setup

1. Ensure you have **Node.js** (version 14 or higher) and **npm** installed.
2. Install project dependencies:
   ```bash
   npm install
   ```

## Running Tests

The project uses [Jest](https://jestjs.io/) with the jsdom environment. Run the full test suite with:

```bash
npm test
```

or install and test in one command:

```bash
npm install && npm test
```

## Deployment

The site is deployed as static content. A GitHub Actions workflow (`.github/workflows/static.yml`) installs dependencies, runs the tests and publishes the repository to **GitHub Pages** on every push to the `main` branch. A `netlify.toml` file is also included for Netlify-based deployments.

