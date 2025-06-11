# AbrahamofLondon Deployment

This repository provides scripts to deploy a local or production WordPress stack using Docker.

## Environment Variables

`Update` reads credentials from the environment. When variables are missing, safe defaults are used so the stack can be started locally.

- `MYSQL_ROOT_PASSWORD` – MySQL root password (default: `wordpress_db_password`)
- `MYSQL_DATABASE` – database name for WordPress (default: `wordpress`)
- `MYSQL_USER` – user name for WordPress (default: `wordpress`)
- `MYSQL_PASSWORD` – password for the above MySQL user (default: `wordpress_password`)
- `WORDPRESS_DB_PASSWORD` – WordPress DB password; falls back to `MYSQL_PASSWORD`
- `WORDPRESS_DB_USER` – WordPress DB user; falls back to `MYSQL_USER`
- `WORDPRESS_DB_NAME` – WordPress DB name; falls back to `MYSQL_DATABASE`

Set these variables to secure values in production environments.

## Usage

Run the deployment script from the repository root:

```bash
./Update
```
