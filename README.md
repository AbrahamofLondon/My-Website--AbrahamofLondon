# Abraham of London Website

This repository contains the source for **Abraham of London**, a modern dark-themed personal website showcasing Abraham's ventures and fathering insights. The site is built with standard HTML, CSS and JavaScript and uses Jest for unit testing.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run tests**
   ```bash
   npm test
   ```

   Additional Jest commands are available in `package.json` and the documentation.

3. **Serve the site locally** (optional)
   You can use any static server such as `http-server` or the Live Server extension in VS Code to serve `index.html`.

## Folder Structure

A simplified view of the repository is shown below:

```text
your-site/
├── index.html        (Main site)
├── styles.css        (Global styles)
├── scripts.js        (JavaScript logic)
├── fathering/
│   ├── memoir.index.html
│   ├── blog/
│   │   ├── index.html
│   │   └── fiction.index.html
│   └── Fictional-Romance/
│       └── index.html
├── tests/            (Jest tests)
└── Project-documentation/ (Extended docs)
```

The `folder-structure` file provides this same outline for quick reference.

## Documentation

Further documentation can be found in the [Project-documentation](Project-documentation/) directory. It includes detailed setup notes and development guidelines, such as the extended `directory.test.js` file describing features, testing configuration, and deployment options.

## License

This project is licensed under the [MIT License](LICENSE).
