const pug = require('pug')
const path = require('path')
const nodemailer = require('nodemailer')
module.exports.sendMail = async (email, subject, otp) => {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    const pathToTemplate = path.join(__dirname, '..', 'templates', 'emailTemplate.pug');
    const htmlTemplate = pug.renderFile(pathToTemplate, {
        email: email,
        otp: otp,
        expiration: 3,
    });

    var mainOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: subject,
        text: 'You recieved message from ' + email,
        html: htmlTemplate

    }
    await transporter.sendMail(mainOptions);

}