const Joi = require('joi');

const { user_roles_enum, constans: { PASSWORD_REGEXP, EMAIL_REGEXP } } = require('../config');

const passwordShema = Joi.string().regex(PASSWORD_REGEXP).required().trim();
const emailShema = Joi.string().regex(EMAIL_REGEXP).required().trim();

const createUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).required().trim(),
    email: emailShema,
    password: passwordShema,
    role: Joi.string().allow(...Object.values(user_roles_enum))
});

const updateUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).trim(),
    email: Joi.string().regex(EMAIL_REGEXP).trim()
});

const preLoginValidator = Joi.object({
    email: emailShema,
    password: passwordShema
});

const passwordValidator = Joi.object({
    password: passwordShema
});

const emailValidator = Joi.object({
    email: emailShema
});

const createOnlyAdmins = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).required().trim(),
    email: emailShema,
    role: Joi.string().allow('admin').required().trim()
});

module.exports = {
    createUserValidator,
    createOnlyAdmins,
    updateUserValidator,
    preLoginValidator,
    passwordValidator,
    emailValidator
};
