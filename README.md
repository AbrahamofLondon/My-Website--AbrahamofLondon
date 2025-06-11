# Abraham of London Website

This repository contains the source for the Abraham of London site. The `Update` script sets up a WordPress stack using Docker.

## Environment Variables

`Update` reads these variables when creating `docker-compose.yml`:

- `MYSQL_ROOT_PASSWORD` – MySQL root password.
- `WORDPRESS_DB_USER` – database user name (defaults to `wordpress`).
- `WORDPRESS_DB_PASSWORD` – database user password.
- `WORDPRESS_DB_NAME` – database name (defaults to `wordpress`).

If any of these are unset, safe defaults are used for local development:

```bash
MYSQL_ROOT_PASSWORD=wordpress_db_password
WORDPRESS_DB_USER=wordpress
WORDPRESS_DB_PASSWORD=wordpress_password
WORDPRESS_DB_NAME=wordpress
```

**Use strong values in production.**

## Usage

```bash
chmod +x Update
./Update
```

Docker and Docker Compose must be installed. To run the JavaScript tests:

```bash
npm install
npm test
```
