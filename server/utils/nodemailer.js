import nodemailer from "nodemailer";
import { ENV } from "../config/env.js";

const transporter = nodemailer.createTransport({
    service: "gmail", // Simpler than specifying host/port
    pool: true, // reuse a warm connection instead of a fresh handshake per email
    connectionTimeout: 8000, // fail fast on a stuck connection so we can retry instead of hanging
    greetingTimeout: 8000,
    socketTimeout: 8000,
    auth: {
        user: ENV.SMTP_USER,
        pass: ENV.SMTP_PASS, // Gmail App Password (NOT your Gmail password)
    },
});

const MAX_ATTEMPTS = 3;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Gmail's SMTP connection is occasionally flaky on some networks (ETIMEDOUT),
// so retry a couple of times with backoff before giving up.
export const sendEmail = async (to, subject, html) => {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
            const info = await transporter.sendMail({
                from: `"Bubbuu" <${ENV.SMTP_USER}>`,
                to,
                subject,
                html,
            });

            console.log("Email sent:", info.messageId);
            return info;
        } catch (error) {
            console.error(`Email sending failed (attempt ${attempt}/${MAX_ATTEMPTS}):`, error.message);

            if (attempt === MAX_ATTEMPTS) {
                throw error;
            }

            await sleep(attempt * 1000);
        }
    }
};