const router = require('express').Router();

const { loginController, passwordController } = require('../controllers');
const {
    userMiddleware: {
        preLoginUser,
        getItemByDynamicParams,
        throwErrorWhenExist,
        validateNewPassword,
        validateEmailWhenForgot
    },
    loginMiddleware: {
        validateAccessToken,
        validateRefreshToken,
        validateActionToken,
        validateAdminToken
    }
} = require('../middlewares');

const { functionVariables: { EMAIL } } = require('../config');
const { User } = require('../dataBase');
const { FORGOT_PASS, ADMIN_TOKEN } = require('../config/action-tokens.enum');

router.route('/')
    .post(
        preLoginUser,
        getItemByDynamicParams(User, EMAIL),
        throwErrorWhenExist(),
        loginController.loginUser
    );

router.route('/logout')
    .post(
        validateAccessToken,
        loginController.logOutUser
    );

router.route('/refresh')
    .post(
        validateRefreshToken,
        loginController.refreshToken
    );

router.route('/password/forgot')
    .post(
        validateEmailWhenForgot,
        getItemByDynamicParams(User, EMAIL),
        throwErrorWhenExist(),
        passwordController.forgotPassword
    );

router.route('/password/reset')
    .post(
        validateNewPassword,
        validateActionToken(FORGOT_PASS),
        passwordController.resetPassword
    );

router.route('/admin/setpassword')
    .post(
        validateNewPassword,
        validateAdminToken(ADMIN_TOKEN),
        passwordController.resetPassword
    );

module.exports = router;
