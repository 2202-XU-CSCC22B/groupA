const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const generateLogToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            username: user.username,
            email: user.email,
        },
        process.env.JWT_PASS || '****',
        {
            expiresIn: '10d',
        }
    );
};

const verifmail = async(email, link) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        // Send email
        let info = await transporter.sendMail({
            from: process.env.USER, //sender
            to: email, //receiver
            subject: "[Account Verification] Property Pass",
            text: "Welcome",
            html: `
            <div>
                <a href=${link}>Click here to activate your account</a>
            </div>
            `// mail body
        });
        console.log("Mail sent successfully!");
        return info;
    } catch (error) {
        console.log(error, "Mail failed to send");
        return null;
    }
};

module.exports = {
    generateLogToken,
    verifmail,
};