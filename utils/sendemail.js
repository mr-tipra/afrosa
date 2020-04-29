const nodemailer = require("nodemailer");

async function sendMail(options){
    
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });
  
    const helperOptions = {
        from:`${process.env.FROM_EMAIL}`,   
        to: options.email,
        subject: options.subject,
        html:options.html
    };

    let info = await transport.sendMail(helperOptions);
    console.log(`Message sent ${info.messageId}`);

};

module.exports = sendMail;