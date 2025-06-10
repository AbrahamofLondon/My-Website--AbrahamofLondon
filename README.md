# Abraham of London Website

This repository contains the source for the **Abraham of London** website. It is a static site with a small test suite powered by [Jest](https://jestjs.io/).

## Requirements

- Node.js (14 or newer)
- npm (comes with Node.js)

## Installation

Install the project dependencies:

```bash
npm install
```

## Running a Development Server

A simple HTTP server is provided via the `http-server` package. Start it with:

```bash
npm run serve
```

This will serve the project at [http://localhost:8000](http://localhost:8000).

## Running Tests

Execute the Jest test suite once:

```bash
npm test
```

Or run in watch mode while developing:

```bash
npm run test:watch
```

## Project Structure

- `index.html`, `styles.css`, `scripts.js` – main site files
- `tests/` – Jest tests


