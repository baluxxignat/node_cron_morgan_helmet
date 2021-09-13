const {
    messages: { NO_TOKEN, INV_TOKEN },
    statusCodes: { CODE_AUTH },
    functionVariables: { AUTHORIZATION, REFRESH }
} = require('../config');

const { ErrorHandler } = require('../errors');
const { loginService: { verifyToken, verifyActionToken } } = require('../services');
const { Oauth, ActionToken, AdminToken } = require('../dataBase');

module.exports = {

    validateAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(CODE_AUTH, NO_TOKEN);
            }

            await verifyToken(access_token);

            const tokenFromDB = await Oauth.findOne({ access_token });

            if (!tokenFromDB) {
                throw new ErrorHandler(CODE_AUTH, INV_TOKEN);
            }

            req.loginedUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(CODE_AUTH, NO_TOKEN);
            }

            await verifyToken(refresh_token, REFRESH);

            const tokenFromDB = await Oauth.findOne({ refresh_token });

            if (!tokenFromDB) {
                throw new ErrorHandler(CODE_AUTH, INV_TOKEN);
            }

            req.loginedUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateActionToken: (tokenType) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(CODE_AUTH, NO_TOKEN);
            }

            await verifyActionToken(token, tokenType);

            const tokenFromDB = await ActionToken.findOne({ action_token: token });

            if (!tokenFromDB) {
                throw new ErrorHandler(CODE_AUTH, INV_TOKEN);
            }

            req.loginedUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateAdminToken: (tokenType) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(CODE_AUTH, NO_TOKEN);
            }

            await verifyActionToken(token, tokenType);

            const tokenFromDB = await AdminToken.findOne({ admin_token: token });

            if (!tokenFromDB) {
                throw new ErrorHandler(CODE_AUTH, INV_TOKEN);
            }

            req.loginedUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

};
