const { emailService, loginService, passwordService } = require('../services');
const {
    emailActionEnum: { FORGOT_PASSWORD },
    statusCodes: { OK },
    functionVariables: { AUTHORIZATION },
    messages: { DONE },
    actionTokenEnum: { FORGOT_PASS },
    variables: {
        SEND_TO_EMAIL,
        SOME_URL
    }
} = require('../config');
const { ActionToken, User, Oauth } = require('../dataBase');

module.exports = {

    forgotPassword: async (req, res, next) => {
        try {
            const {
                user: {
                    name,
                    _id,
                    // email
                }
            } = req;

            const actionToken = await loginService.generateactionToken(FORGOT_PASS);

            await ActionToken.create({ action_token: actionToken, user: _id });

            await emailService.sendMail(
                SEND_TO_EMAIL, // email
                FORGOT_PASSWORD,
                { name, newActionToken: `${SOME_URL}/password?token=${actionToken}` }
            );

            res.status(OK).json(DONE);
        } catch (e) {
            next(e);
        }
    },

    resetPassword: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            const { loginedUser: { _id }, body: { password } } = req;

            const hashNewPassword = await passwordService.hashPassword(password);

            await User.findByIdAndUpdate(_id, { password: hashNewPassword });
            await ActionToken.updateOne({ token });
            await Oauth.deleteMany({ user: _id });

            res.status(OK).json(DONE);
        } catch (e) {
            next(e);
        }
    },

};
