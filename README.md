# Abraham of London Website

This repository contains the source code for the **Abraham of London** website.

## Offline Setup

All Node.js dependencies are provided in the archive `abrahamoflondon-node_modules.tar.gz` so that the project can be used without internet access.

### Extract dependencies

1. Place `abrahamoflondon-node_modules.tar.gz` in the repository root.
2. Extract it using:
   ```bash
   tar -xzf abrahamoflondon-node_modules.tar.gz
   ```
   This creates the `node_modules` directory used by npm.

### Verify `node_modules` and `package-lock.json`

Run `npm ci --offline --ignore-scripts` to verify the extracted modules match `package-lock.json`:
```bash
npm ci --offline --ignore-scripts
```
If the command exits without errors, the installed modules are consistent with the lock file.

## Running the project

After extraction you can run the common npm scripts completely offline:

- **Tests**
  ```bash
  npm test
  ```
- **Linting**
  ```bash
  npm run lint
  ```
- **Start the server**
  ```bash
  npm start
  ```

`npm start` serves the site locally using `serve` on port 3000.

