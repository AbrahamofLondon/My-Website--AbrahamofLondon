# Abraham of London Website

This project contains the source for Abraham of London's personal website. The site is a modern, responsive static site built with plain HTML, CSS and JavaScript. Tests are written with Jest.

## Getting Started

### Install dependencies

Use `npm ci` to install all Node dependencies from `package.json`:

```bash
npm ci
```

### Run tests

Execute the Jest test suite with:

```bash
npm test
```

### Serve locally

Because this is a static site, you can use any local server. One simple option is:

```bash
npx serve .
# or using Python
python3 -m http.server 8000
```

Then open your browser to `http://localhost:8000`.

## Dev Container

The repository can be opened in a dev container (such as VS Code Dev Containers or GitHub Codespaces) to automatically configure Node and other tools for development.

## Continuous Integration

GitHub Actions workflow [`static.yml`](.github/workflows/static.yml) installs dependencies, runs tests, and deploys the site to GitHub Pages whenever changes are pushed to the `main` branch.

## License

This project is released under the [MIT License](LICENSE).
