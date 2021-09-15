const dayJs = require('dayjs');
const utc_for_dayJs = require('dayjs/plugin/utc');

const {
    functionService: { findByItem },
    emailService
} = require('../services');
const {
    dataBaseTokenEnum: { USER }, emailActionEnum: {
        WE_MISS_YOU
    }
} = require('../config');
const { Oauth } = require('../dataBase');

dayJs.extend(utc_for_dayJs);

module.exports = async () => {
    const tenDaysAbsent = dayJs.utc().subtract(10, 'day');

    const findUsersTenDaysAbsent = await findByItem(Oauth, { createdAt: { $lte: tenDaysAbsent } }, USER);

    const iterable = findUsersTenDaysAbsent.map(async (item) => {
        await emailService.sendMail(item.user.email, WE_MISS_YOU, { name: item.user.name });
    });

    await Promise.allSettled(iterable);
};
