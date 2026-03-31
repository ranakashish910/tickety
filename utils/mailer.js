const nodemailer = require('nodemailer');

const sendWelcomeEmail = async (userEmail, userName) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS 
            }
        });

        const mailOptions = {
            from: `"TICKETY Team" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: 'Welcome to TICKETY - Your Journey Starts Here!',
            html: `
                <div style="font-family: sans-serif; background-color: #0d1117; color: white; padding: 20px; border-radius: 10px;">
                    <h1 style="color: #00f2ff;">Hello, ${userName}!</h1>
                    <p>Welcome to <b>TICKETY</b>. We are thrilled to have you join our AI-driven event platform.</p>
                    <p>Start exploring immersive 3D seat selections and trending concerts today!</p>
                    <br>
                    <p style="font-size: 0.8rem; margin-top: 20px;">&copy; TICKETY 2026</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log("Welcome email sent to: " + userEmail);

    } catch (error) {
        console.log("Email Error: ", error);
    }
};

module.exports = sendWelcomeEmail;