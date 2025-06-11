# Abraham of London Website

This repository contains the source files for the personal website of Abraham of London. The site is mostly static HTML/CSS/JS with some supporting documentation and test files.

## Deployment Scripts

Two helper scripts are provided in the `scripts/` directory for setting up a WordPress environment with Docker:

- **Update** – builds a local WordPress instance and installs a custom theme along with several plugins. It performs package installation and file generation automatically.
- **Update-Secure.sh** – a hardened version that uses environment variables and secure defaults. It can start, stop and clean up the Docker based environment.

### Usage

```bash
# run the basic setup (creates Docker containers and directories)
./scripts/Update

# or use the secure script with commands
./scripts/Update-Secure.sh start
```

### Caution

Both scripts create Docker containers and may install software on your system. Run them only on machines where such modifications are acceptable and review the code before execution.
