# My Website - Abraham of London

This project contains the source code for the "Abraham of London" website. It includes HTML, CSS, JavaScript, and a test suite powered by Jest.

## Getting Started

Before running any tests or executing the GitHub Actions workflow, install the project dependencies:

```bash
npm install
```

This command installs the required `node_modules` directory so that `npm test` and the CI workflow can run.

### Offline dependencies

If you are running the tests or GitHub Actions offline, extract the prebuilt modules archive:

```bash
tar -xzf offline-node-module.tar.gz
```

This file contains all `node_modules` needed for testing without network access.

## Running Tests

Once dependencies are installed (or extracted for offline use), run:

```bash
npm test
```

This command executes the Jest test suite.


