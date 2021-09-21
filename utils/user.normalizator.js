const { functionVariables: { PASS, V, ID_2 } } = require('../config');

module.exports = {
    userToNormalize: (userToNormalize) => {
        const fildsToRemove = [
            PASS,
            V,
            ID_2

        ];

        userToNormalize = userToNormalize.toObject();
        // console.log(userToNormalize);

        fildsToRemove.forEach((field) => {
            delete userToNormalize[field];
        });

        return userToNormalize;
    }
};
