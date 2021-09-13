const bcrypt = require('bcrypt');

const { ErrorHandler } = require('../errors');
const {
    statusCodes: { BAD_REQUEST },
    messages: { MAIL_OR_PASS }
} = require('../config');

module.exports = {

    hashPassword: (password) => bcrypt.hash(password, 10),

    compare: async (hash, password) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new ErrorHandler(BAD_REQUEST, MAIL_OR_PASS);
        }
    }
};
