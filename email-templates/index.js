const { emailActionEnum } = require('../config');

module.exports = {
    [emailActionEnum.ACCOUNT_CREATED]: {
        templateName: 'accountWasCreated',
        subject: 'accountWasCreated'
    },

    [emailActionEnum.LOGINATION_SUCCESSFUL]: {
        templateName: 'loginationSuccessful',
        subject: 'loginationSuccessful'
    },

    [emailActionEnum.ACCOUNT_DELETED_USER]: {
        templateName: 'accountWasDelatedUser',
        subject: 'accountWasDelatedUser'
    },

    [emailActionEnum.ACCOUNT_DELETED_ADMIN]: {
        templateName: 'accountWasDelatedByAdmin',
        subject: 'accountWasDelatedByAdmin'
    },

    [emailActionEnum.ACCOUNT_UPDATED]: {
        templateName: 'accountWasUpdated',
        subject: 'accountWasUpdated'
    },

    [emailActionEnum.FORGOT_PASSWORD]: {
        templateName: 'forgotPassword',
        subject: 'forgotPassword'
    },

    [emailActionEnum.RESET_PASSWORD]: {
        templateName: 'resetPassword',
        subject: 'resetPassword'
    },

    [emailActionEnum.ADMIN_ACCOUNT_CREATED]: {
        templateName: 'adminAccountWasCreated',
        subject: 'admin_account_created'
    }
};
