# Abraham of London Website

This repository contains the source for the Abraham of London website. The site
is built with static HTML, CSS and JavaScript and includes automated tests using
[Jest](https://jestjs.io/) with a `jsdom` environment.

## Setup

1. Install the project dependencies (including the dev dependencies `jest` and
   `jsdom`):
   ```bash
   npm install
   ```
2. Run the test suite:
   ```bash
   npm test
   ```
   This will execute `tests/scripts.test.js`.

## Continuous Integration

A GitHub Actions workflow is included in
[`.github/workflows/static.yml`](.github/workflows/static.yml) which installs
Node.js, runs `npm ci`, and executes the tests on each push to the `main`
branch.
