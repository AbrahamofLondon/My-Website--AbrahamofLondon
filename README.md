# Abraham of London Website

This repository contains the source for the Abraham of London website and accompanying deployment scripts.

## Installation

1. Install Node.js (version 14 or later).
2. Install the project dependencies:

```bash
npm install
```

## Running Tests

Execute the test suite using Jest:

```bash
npm test
```

## Serving the Site Locally

Any static HTTP server may be used. One simple option is to run:

```bash
npx http-server -p 8000
```

Then visit `http://localhost:8000` in your browser.

## Deployment Scripts

Two helper scripts are provided for deploying WordPress environments:

- `Update` – a comprehensive setup and deployment script for the website.
- `Update-Secure.sh` – similar to `Update` but with additional security features and Docker-based configuration.

Refer to the comments in these scripts for details before running them.

## Netlify

A `netlify.toml` file is included for deploying the static site to Netlify. The publish directory is the repository root.

