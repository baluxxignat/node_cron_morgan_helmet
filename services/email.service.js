const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const { variables: { NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD, SOME_URL } } = require('../config');
const allTemplates = require('../email-templates');
const { ErrorHandler } = require('../errors');
const { messages: { TEMPLATE_NAME_ERROR }, statusCodes: { INTERNAL_SERVER_ERROR } } = require('../config');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NO_REPLY_EMAIL,
        pass: NO_REPLY_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) throw new ErrorHandler(INTERNAL_SERVER_ERROR, TEMPLATE_NAME_ERROR);

    const { templateName, subject } = templateInfo;
    context.frontEndURL = SOME_URL;

    const html = await templateParser.render(templateName, context);

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject,
        html
    });
};

module.exports = {
    sendMail
};
