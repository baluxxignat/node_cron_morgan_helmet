const cron = require('node-cron');

const removeOldTokens = require('./removeOldTokens');
const sendEmailforNotVisited = require('./sendEmailforNotVisited');

module.exports = () => {
    cron.schedule(' * * 1 * * ', async () => {
        await removeOldTokens();
    });

    cron.schedule(' 30 6 * * 1,3,5 ', async () => {
        await sendEmailforNotVisited();
    });
};
