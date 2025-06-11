# Abraham of London Website

This repository contains the source code for **Abraham of London**, a personal website built with HTML, CSS and a small amount of JavaScript. Automated tests are written with [Jest](https://jestjs.io/) to keep the JavaScript in good shape.

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or later.

You can install dependencies and run all development commands from a regular Node environment, a GitHub Codespace or any [VS Code Dev Container](https://code.visualstudio.com/docs/devcontainers/containers) that includes Node.

## Installation

Use `npm ci` to install the exact dependency versions described in `package.json`:

```bash
npm ci
```

## Running Tests

Execute the full test suite with:

```bash
npm test
```

## Serving the Site Locally

The site is completely static. You can open `index.html` directly in a browser or use any simple HTTP server. For example:

```bash
npx serve .
```

## Continuous Integration

A GitHub Actions workflow in `.github/workflows/static.yml` installs dependencies, runs `npm test` and deploys the site to GitHub Pages whenever changes are pushed to `main`.

## Development Container

If you prefer an isolated environment, you can open this repository in a dev container using VS Code's **Dev Containers** extension or GitHub Codespaces. The container should provide Node 20 and will run the same commands shown above.

