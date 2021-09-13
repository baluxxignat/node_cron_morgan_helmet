const {
    constans: { PHOTO_MAX_SIZE, MINETYPES },
    statusCodes: { BAD_REQUEST },
    messages: { TOO_BIG, WRONG_FORMAT }
} = require('../config');
const { ErrorHandler } = require('../errors');

module.exports = {
    checkAvatar: (req, res, next) => {
        try {
            if (!req.files || !req.files.avatar) {
                next();
                return;
            }

            const { name, size, mimetype } = req.files.avatar;

            if (size > PHOTO_MAX_SIZE) {
                throw new ErrorHandler(BAD_REQUEST, `File ${name} ${TOO_BIG}`);
            }

            if (!MINETYPES.PHOTO.includes(mimetype)) {
                throw new ErrorHandler(BAD_REQUEST, WRONG_FORMAT);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
