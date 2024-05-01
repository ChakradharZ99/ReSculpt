import nodemailer from "nodemailer";

export const sendEmail = async (recipientEmail: string, subject: string, text: string) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PASS,
            }
        });

        let mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: recipientEmail,
            subject: subject,
            text: text
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: 'Error sending email' };
    }
};