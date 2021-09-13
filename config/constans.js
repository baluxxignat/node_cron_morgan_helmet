module.exports = {
    PASSWORD_REGEXP: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})'),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    CURRENT_YEAR: new Date().getFullYear(),

    PHOTO_MAX_SIZE: 5 * 1024 * 1024,
    MINETYPES: {
        PHOTO: [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/tiff'
        ]

    }
};
