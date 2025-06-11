# Task Runner

This project includes a small task runner to lint, test and optionally compile the project. After all tasks succeed the runner emails a log file.

## Setup
1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the project root with your SMTP details:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=yourpassword
EMAIL_TO=recipient@example.com
```

## Usage
Run the tasks sequentially with:

```bash
npm run run-tasks
```

This will execute `lint`, `test` and (if defined) `compile` scripts. Results are written to `task-summary.log` and emailed to the address specified in `.env`.
