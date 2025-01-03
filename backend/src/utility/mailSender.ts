import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_NODEMAILER,
        pass: process.env.PASSWORD_NODEMAILER,
    },
});

export const mailSender = (email: string, title: string, otp: string) => {
    const mailOptions = {
        from: 'dharmendrasinghchaudhary44@gmail.com',
        to: `${email}`,
        subject: `${title}`,
        text: `Your confirmation OTP is: ${otp}`,
        //   html: '<p>This email was sent using <b>Node.js</b> and <b>Nodemailer</b>!</p>',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error:', error.message);
        }
        console.log('Email sent successfully:', info.response);
    });

}