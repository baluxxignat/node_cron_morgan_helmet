const { functionVariables: { PASS, V } } = require('../config');

module.exports = {
    userToNormalize: (userToNormalize) => {
        const fildsToRemove = [
            PASS,
            V,
        ];

        userToNormalize = userToNormalize.toObject();
        // console.log(userToNormalize);

        fildsToRemove.forEach((field) => {
            delete userToNormalize[field];
        });

        return userToNormalize;
    }
};
