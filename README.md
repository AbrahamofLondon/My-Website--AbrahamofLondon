# Abraham of London Website

This repository contains the source code for **Abraham of London**, the personal website of the visionary entrepreneur behind Alomarada, Endureluxe and other ventures.

The site is built with standard HTML, CSS and JavaScript.  Tests are written using [Jest](https://jestjs.io/) and a Netlify configuration (`netlify.toml`) is included for easy deployment.

## Installation

1. Ensure you have [Node.js](https://nodejs.org/) installed.
2. Install the project dependencies:

```bash
npm install
```

## Running Tests

Execute all automated tests with:

```bash
npm test
```

The tests use Jest and check basic functionality in `scripts.js`.

## Deployment

The simplest way to deploy is with [Netlify](https://www.netlify.com/).  Connect this repository to a Netlify site and it will pick up the `netlify.toml` file, which publishes from the repository root.  Other hosting platforms that serve static files will also work.

## Development Container

A Dev Container configuration will be added to this repository. Once present, you can open the project in VS Code and select **Reopen in Container** to develop inside a consistent environment.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
