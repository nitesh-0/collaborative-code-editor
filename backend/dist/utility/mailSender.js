"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
// Create a transporter
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password', // Use App Password for Gmail
    },
});
// Define email options
const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'recipient-email@example.com',
    subject: 'Hello from Node.js',
    text: 'This email was sent using Node.js and Nodemailer!',
    html: '<p>This email was sent using <b>Node.js</b> and <b>Nodemailer</b>!</p>',
};
// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Error:', error.message);
    }
    console.log('Email sent successfully:', info.response);
});
