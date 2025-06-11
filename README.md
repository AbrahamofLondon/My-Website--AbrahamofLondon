# Abraham of London Website

A personal website showcasing Abraham of London's ventures and fathering advice. The design follows a modern dark theme with gold accents, responsive layouts, and interactive elements.

## Running Tests

The project uses **Jest** with a jsdom environment. Tests are located in the `tests/` directory.

```bash
npm install          # install dependencies
npm test             # run all tests
npm run test:watch   # watch mode
npm run test:coverage# generate coverage report
```

## Deployment

Static hosting is configured via GitHub Actions which installs dependencies, runs tests, and publishes the site to GitHub Pages. You can also deploy manually or use the `Update` script for a Docker-based WordPress setup.
