# Abraham of London Website

This repository contains scripts and configuration for deploying the Abraham of London WordPress site.

## Update Script

The `Update` script generates a `docker-compose.yml` file and other configuration required to start the WordPress stack. Credentials were previously hardcoded but are now read from environment variables.

Set the following environment variables before running `Update`:

- `MYSQL_ROOT_PASSWORD` – root password for the MySQL container
- `MYSQL_PASSWORD` – application user password for the MySQL container
- `WORDPRESS_DB_PASSWORD` – password WordPress uses to connect to MySQL

Run the script with these variables exported in your shell:

```bash
export MYSQL_ROOT_PASSWORD=<your_root_password>
export MYSQL_PASSWORD=<your_db_user_password>
export WORDPRESS_DB_PASSWORD=$MYSQL_PASSWORD
./Update
```

The script will create the docker compose configuration using these values.
