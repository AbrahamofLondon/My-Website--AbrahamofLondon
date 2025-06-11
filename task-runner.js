const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const nodemailer = require('nodemailer');

// Environment checks
if (parseInt(process.versions.node.split('.')[0], 10) < 14) {
  console.error('Node.js 14 or higher is required.');
  process.exit(1);
}

const logFile = path.join(__dirname, 'task-summary.log');
function log(message) {
  fs.appendFileSync(logFile, message + '\n');
}

function runCommand(command, label) {
  return new Promise((resolve, reject) => {
    log(`\nRunning: ${command}`);
    const child = exec(command, { env: process.env }, (error, stdout, stderr) => {
      if (stdout) log(stdout.trim());
      if (stderr) log(stderr.trim());
      if (error) {
        log(`${label} failed`);
        return reject(error);
      }
      log(`${label} succeeded`);
      resolve();
    });
  });
}

async function main() {
  try {
    await runCommand('npm run lint', 'Lint');
    await runCommand('npm test', 'Test');

    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
    if (pkg.scripts && pkg.scripts.compile) {
      await runCommand('npm run compile', 'Compile');
    } else {
      log('Compile step skipped');
    }

    await sendEmail();
    console.log('All tasks completed successfully.');
  } catch (err) {
    console.error('Task runner failed. See log for details.');
  }
}

async function sendEmail() {
  if (!process.env.SMTP_HOST) {
    log('SMTP configuration missing, skipping email notification.');
    return;
  }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    subject: 'Task Summary Log',
    text: fs.readFileSync(logFile, 'utf8'),
  });
  log('Log emailed successfully');
}

main();
