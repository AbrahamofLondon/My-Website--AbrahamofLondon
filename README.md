# Abraham of London Website

This repository contains the source code for the Abraham of London web site and related tests.

## Installing dependencies

Before running `npm test` or the GitHub Actions workflow, make sure all Node.js dependencies are installed:

```bash
npm install
```

If you do not have internet access, extract the `offline-node-module.tar.gz` archive (included in this repository) so that `node_modules` is available offline:

```bash
tar -xzf offline-node-module.tar.gz
```

After installing dependencies, you can run the test suite with `npm test` or trigger the workflow defined in `test.yml`.

