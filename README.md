# Task Runner

This project includes a `task-runner.js` script that sequentially runs lint, test and compile steps and emails a summary log when all tasks pass.

## Configuration

Create a `.env` file in the project root with your SMTP settings:

```
SMTP_HOST=your.smtp.host
SMTP_PORT=587
SMTP_SECURE=false # set to true if using TLS/SSL
SMTP_USER=your_username
SMTP_PASS=your_password
SMTP_FROM=sender@example.com
SMTP_TO=recipient@example.com
```

The email step is skipped if `SMTP_HOST` is not defined.

## Running the tasks

Install dependencies and run:

```bash
npm run run-tasks
```

The log output is stored in `task-summary.log` and, if configured, emailed to the address specified in `SMTP_TO`.
