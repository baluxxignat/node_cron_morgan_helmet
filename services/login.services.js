const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { ErrorHandler } = require('../errors');
const {
    actionTokenEnum: { FORGOT_PASS, ACTIVATE_ACCOUNT },
    variables: {
        ACCESS_SECRET_KEY,
        REFRESH_SECRET_KEY,
        ACTION_SECRET_KEY,
        ADMIN_TOKEN_SECRET_KEY,
        ACTIVATE_ACCOUNT_SECRET_KEY
    },
    statusCodes: { CODE_AUTH, INTERNAL_SERVER_ERROR },
    messages: { INV_TOKEN, TOKEN_TYPE },
    functionVariables: { ACCESS }
} = require('../config');
const { ADMIN_TOKEN } = require('../config/action-tokens.enum');

const verifyPromise = promisify(jwt.verify);

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '16m' });
        const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '31d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = ACCESS) => {
        try {
            const secretWord = tokenType === ACCESS ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

            await verifyPromise(token, secretWord);
        } catch (e) {
            throw new ErrorHandler(CODE_AUTH, INV_TOKEN);
        }
    },

    generateactionToken: (actionType) => {
        const secretWord = _getSecretWordForActionToken(actionType);
        return jwt.sign({}, secretWord, { expiresIn: '16m' });
    },

    verifyActionToken: (token, actionType) => {
        const secretWord = _getSecretWordForActionToken(actionType);
        return jwt.verify(token, secretWord);
    },
};

function _getSecretWordForActionToken(actionType) {
    let secretWord = '';

    switch (actionType) {
        case FORGOT_PASS:
            secretWord = ACTION_SECRET_KEY;
            console.log(secretWord);
            break;
        case ACTIVATE_ACCOUNT:
            secretWord = ACTIVATE_ACCOUNT_SECRET_KEY;
            break;
        case ADMIN_TOKEN:
            secretWord = ADMIN_TOKEN_SECRET_KEY;
            break;
        default:
            throw new ErrorHandler(INTERNAL_SERVER_ERROR, TOKEN_TYPE);
    }

    return secretWord;
}
