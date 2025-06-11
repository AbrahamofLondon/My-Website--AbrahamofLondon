# AbrahamofLondon Website

This repository contains resources for deploying the AbrahamofLondon WordPress site using Docker.

## Required environment variables

The `Update` script reads sensitive credentials from the environment. Set these variables before running the script:

- `MYSQL_ROOT_PASSWORD` – root password used for the MySQL container.
- `WORDPRESS_DB_PASSWORD` – password for the WordPress database user.

Example usage:

```bash
export MYSQL_ROOT_PASSWORD=mysupersecretpassword
export WORDPRESS_DB_PASSWORD=mywordpresspassword
./Update
```
