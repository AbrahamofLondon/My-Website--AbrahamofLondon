# Abraham of London Website

This repository contains the source for the **Abraham of London** personal website. It is a static site with a few JavaScript utilities and Jest tests. The site uses plain HTML/CSS/JS and does not require a build step.

## Prerequisites

- **Node.js** v14 or higher
- **npm** (comes with Node.js)

## Getting Started

Install dependencies and run the test suite:

```bash
npm install
npm test
```

The test command runs [Jest](https://jestjs.io/) which validates basic DOM behaviour in `scripts.js`.

### Additional Scripts

A more complete example of package scripts can be found in `Project-documentation/Packet.json-Project-Dependencies`. It includes commands for linting (`npm run lint`, `npm run lint:fix`), running tests in watch mode, generating coverage reports (`npm run test:coverage`), and other utilities. These scripts are not included in the main `package.json` but demonstrate how the project could be expanded.

## Folder Layout

```
.
├── index.html              # Main webpage
├── styles.css              # Global styles
├── scripts.js              # Front-end logic
├── fathering/              # Additional HTML pages
│   ├── memoir.index.html
│   ├── blog/
│   │   ├── index.html
│   │   └── fiction.index.html
│   └── Fictional-Romance/
│       └── index.html
├── tests/                  # Jest test files
│   └── scripts.test.js
├── Project-documentation/  # Extra docs and example configs
│   ├── Packet.json-Project-Dependencies
│   ├── directory.test.js
│   └── tests/
│       └── Jest-Test-Setup Code-setup.js
└── ...                     # Other scripts and config files
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
