# My-Website--AbrahamofLondon

This project contains a simple static website with a small Jest test suite. Below are steps to get the project running and how to deploy it.

## Setup

1. **Install Node dependencies**

   Use `npm ci` to install the exact dependencies listed in `package-lock.json`:

   ```bash
   npm ci
   ```

2. **Run tests**

   Execute the Jest test suite with:

   ```bash
   npm test
   ```

   This will run all tests in the `tests/` directory.

3. **Deploying the site**

   This is a static site, so there is no build step. You can deploy in two common ways:

   ### GitHub Pages

   - Push the contents of the repository to GitHub.
   - In the repository settings, enable GitHub Pages and choose the branch (for example `main`) and the `/` (root) directory as the source.
   - GitHub will host the files directly from that branch.

   ### Netlify

   - Create a new site on Netlify and connect it to this repository.
   - Netlify reads `netlify.toml` and will publish the root directory (`.`) with no build command.
   - Alternatively, you can use the Netlify CLI:

     ```bash
     npx netlify deploy
     ```

     Follow the prompts to deploy.

These steps should help contributors install dependencies, run tests, and deploy the site.
