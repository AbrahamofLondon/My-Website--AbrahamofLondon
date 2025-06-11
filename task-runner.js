const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const logFile = path.join(__dirname, 'task-summary.log');

function log(message) {
  console.log(message);
  fs.appendFileSync(logFile, message + '\n');
}

function checkEnv() {
  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'EMAIL_TO'];
  const missing = required.filter(k => !process.env[k]);
  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
  const major = parseInt(process.versions.node.split('.')[0], 10);
  if (major < 14) {
    throw new Error(`Node.js version ${process.versions.node} is not supported`);
  }
}

function runCommand(cmd) {
  return new Promise((resolve, reject) => {
    log(`Running: ${cmd}`);
    const child = exec(cmd, (err, stdout, stderr) => {
      if (stdout) log(stdout.trim());
      if (stderr) log(stderr.trim());
      if (err) return reject(err);
      resolve();
    });
  });
}

async function sendEmail() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.EMAIL_TO,
    subject: 'Task Summary',
    text: fs.readFileSync(logFile, 'utf8')
  });
  log('Email sent');
}

async function main() {
  fs.writeFileSync(logFile, '');
  try {
    checkEnv();
    await runCommand('npm run lint');
    await runCommand('npm test');
    const pkg = require('./package.json');
    if (pkg.scripts && pkg.scripts.compile) {
      await runCommand('npm run compile');
    }
    await sendEmail();
  } catch (err) {
    log('Error: ' + err.message);
    process.exitCode = 1;
  }
}

main();
