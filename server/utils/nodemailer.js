import nodemailer from "nodemailer";
import { ENV } from "../config/env.js";

const transporter = nodemailer.createTransport({
    service: "gmail", // Simpler than specifying host/port
    auth: {
        user: ENV.SMTP_USER,
        pass: ENV.SMTP_PASS, // Gmail App Password (NOT your Gmail password)
    },
});

export const sendEmail = async (to, subject, html) => {
    try {
        await transporter.verify();
        console.log("SMTP Server is ready.");

        const info = await transporter.sendMail({
            from: `"Your App Name" <${ENV.SMTP_EMAIL}>`,
            to,
            subject,
            html,
        });

        console.log("Email sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("Email sending failed:", error);
        throw error;
    }
};