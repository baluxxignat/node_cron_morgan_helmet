const { ErrorHandler } = require('../errors');
const {
    messages: {
        M_NOT_FOUND,
        FORBIDDEN_MSG,
        ALREADY_EXIST
    }
} = require('../config');
const {
    statusCodes: {
        NOT_FOUND,
        BAD_REQUEST,
        FORBIDDEN,
        CONFLICT
    }
} = require('../config');
const { userValidator } = require('../validators');

module.exports = {

    validateSomeFilds: (valid) => (req, res, next) => {
        try {
            const { error } = valid.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    preLoginUser: (req, res, next) => {
        try {
            const { error } = userValidator.preLoginValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (rolesArr = []) => (req, res, next) => {
        try {
            const { role } = req.loginedUser;
            const { loginedUser, user } = req;

            if (loginedUser._id.toString() === user._id.toString()) {
                req.userIsLogined = true;
                return next();
            }

            if (!rolesArr.length) return next();

            if (!rolesArr.includes(role)) {
                throw new ErrorHandler(FORBIDDEN, FORBIDDEN_MSG);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserisAdmin: (req, res, next) => {
        try {
            const { role } = req.loginedUser;

            if (role !== 'admin') {
                throw new ErrorHandler(FORBIDDEN, FORBIDDEN_MSG);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getItemByDynamicParams: (DB, paramName, searchIn = 'body', dbFiled = paramName) => async (req, res, next) => {
        try {
            const valueParam = req[searchIn][paramName];
            const item = await DB.findOne({ [dbFiled]: valueParam });

            req.user = item;
            req.car = item;

            next();
        } catch (e) {
            next(e);
        }
    },

    throwErrorWhenExist: (emailWasFounded = false) => (req, res, next) => {
        try {
            const { user } = req;
            if (user && emailWasFounded) {
                return next(new ErrorHandler(CONFLICT, ALREADY_EXIST));
            }

            if (!user && !emailWasFounded) {
                return next(new ErrorHandler(NOT_FOUND, M_NOT_FOUND));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateNewPassword: (req, res, next) => {
        try {
            const { error, value } = userValidator.passwordValidator.validate(req.body);

            req.body = value;

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateEmailWhenForgot: (req, res, next) => {
        try {
            const { error, value } = userValidator.emailValidator.validate(req.body);

            req.body = value;

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }

};
