### Backend Integration

The contact form in this project currently performs only client-side validation.
To prepare it for production, implement the following steps:

1. **Add server-side processing** to handle form submissions.
2. **Configure an email service** such as SendGrid or Mailgun to deliver messages.
3. **Enable security features** including CSRF protection and spam filtering.

For deployments that use the `Update` WordPress script, set these environment variables:

```bash
MYSQL_ROOT_PASSWORD=your_secure_password
WORDPRESS_DB_PASSWORD=your_db_password
WORDPRESS_ADMIN_EMAIL=your_email@domain.com
```
