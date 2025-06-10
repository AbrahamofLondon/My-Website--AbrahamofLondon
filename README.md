# Abraham of London Website

This repository contains the source code for **Abraham of London**, a personal brand site describing Abraham as an entrepreneur, strategist and storyteller. The project is a static website built with HTML, CSS and JavaScript. Basic tests are included to verify front‑end behavior.

## Directory Layout

```
your-site/
├── index.html                 # Main landing page
├── styles.css                 # Core site styles
├── scripts.js                 # JavaScript logic
├── fathering/                 # Section containing blog/memoir pages
│   ├── memoir.index.html      # Memoir page
│   ├── blog/
│   │   ├── index.html         # Blog homepage
│   │   └── fiction.index.html # Short fiction post
│   └── Fictional-Romance/
│       └── index.html         # Romance fiction page
├── tests/                     # Jest unit tests
├── netlify.toml               # Netlify deployment settings
└── package.json               # Node.js project info
```

For a simplified overview of the file placement, see `file-placement.html` and `folder-structure`.

## Getting Started

Install dependencies using [npm](https://www.npmjs.com/):

```bash
npm install
```

### Running Tests

The project uses [Jest](https://jestjs.io/) with jsdom for unit testing. Execute tests with:

```bash
npm test
```

### Deployment

The repository includes a basic `netlify.toml` for deploying as a static site. To deploy on [Netlify](https://www.netlify.com/):

1. Create a Netlify account and connect it to this repository.
2. Netlify will read `netlify.toml`; no build command is needed and the publish directory is the repo root.
3. Trigger a deploy from the Netlify dashboard or push changes to your main branch.

You can also use the [Netlify CLI](https://docs.netlify.com/cli/get-started/) for local previews and manual deployments:

```bash
npm install -g netlify-cli
netlify deploy
```

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
