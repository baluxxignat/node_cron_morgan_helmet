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

router.post('/',
    preLoginUser,
    getItemByDynamicParams(User, EMAIL),
    throwErrorWhenExist(),
    loginController.loginUser);

router.post('/logout',
    validateAccessToken,
    loginController.logOutUser);

router.post('/refresh',
    validateRefreshToken,
    loginController.refreshToken);

router.post('/password/forgot',
    validateEmailWhenForgot,
    getItemByDynamicParams(User, EMAIL),
    throwErrorWhenExist(),
    passwordController.forgotPassword);

router.post('/password/reset',
    validateNewPassword,
    validateActionToken(FORGOT_PASS),
    passwordController.resetPassword);

router.post('/admin/setpassword',
    validateNewPassword,
    validateAdminToken(ADMIN_TOKEN),
    passwordController.resetPassword);

module.exports = router;
