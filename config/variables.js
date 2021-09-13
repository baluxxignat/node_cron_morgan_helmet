module.exports = {
    PORT: process.env.PORT || 5000,
    DATA_BASE_PORT: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/apr-2021',

    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'Secret',
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'Secret2',
    ACTION_SECRET_KEY: process.env.ACTION_SECRET_KEY || 'Secret3',
    ADMIN_TOKEN_SECRET_KEY: process.env.ADMIN_TOKEN_SECRET_KEY || 'Secret4',
    ACTIVATE_ACCOUNT_SECRET_KEY: process.env.ACTIVATE_ACCOUNT_SECRET_KEY || 'Secret_activation',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'test@example.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || 'test@example.com',
    SEND_TO_EMAIL: 'aleksandr.pravo@gmail.com',
    SOME_URL: 'https://www.youtube.com'
};
