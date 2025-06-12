# Abraham of London

This project hosts Abraham of London's personal brand website built with offline-friendly tooling.

## Installation

Unpack the bundled node modules and ensure executables are accessible:

```bash
tar -xzf offline-node-modules.tar.gz
chmod +x node_modules/.bin/*
```

## Testing

Run ESLint and Jest:

```bash
npx eslint .
npm test
```

## Deployment

The site deploys automatically via GitHub Actions when changes are pushed to the `main` branch. Static files can be served through any static hosting provider.

## SEO Best Practices

Pages include descriptive meta tags and structured data, and assets are optimized for performance and accessibility.

## License

This project is licensed under the MIT License.
