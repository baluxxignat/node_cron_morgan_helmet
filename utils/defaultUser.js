const { User } = require('../dataBase');
const { passwordService } = require('../services');

const {
    variables: { email_admin, password_admin },
    functionVariables: { ADMIN_NAME },
    user_roles_enum: { ADMIN }
} = require('../config');

module.exports = (async () => {
    const user = await User.findOne();

    if (!user) {
        const defaultAdmin = {
            name: ADMIN_NAME,
            email: email_admin,
            role: ADMIN,
            password: await passwordService.hashPassword(password_admin)
        };

        await User.create(defaultAdmin);
    }
})();
