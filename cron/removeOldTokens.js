const dayJs = require('dayjs');
const utc_for_dayJs = require('dayjs/plugin/utc');

dayJs.extend(utc_for_dayJs);

const { Oauth, ActionToken } = require('../dataBase');

module.exports = async () => {
    const previousMonth = dayJs.utc().subtract(1, 'month');

    await Oauth.deleteMany({ createdAt: { $lte: previousMonth } });
    await ActionToken.deleteMany({ createdAt: { $lte: previousMonth } });
};
