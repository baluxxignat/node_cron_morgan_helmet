const {
    functionService,
    emailService,
    loginService
} = require('../services');
const {
    actionTokenEnum: { ADMIN_TOKEN },
    emailActionEnum: { ADMIN_ACCOUNT_CREATED },
    variables: { SEND_TO_EMAIL, SOME_URL },
    statusCodes: { CREATED },
    messages: { DONE }
} = require('../config');
const { User, AdminToken } = require('../dataBase');

module.exports = {
    createnewAdmin: async (req, res, next) => {
        try {
            const { body: { name }, loginedUser } = req;

            const createdUser = await functionService.createItem(User, { ...req.body, password: '12345' });

            const adminToken = await loginService.generateactionToken(ADMIN_TOKEN);

            await AdminToken.create({ admin_token: adminToken, user: createdUser._id });

            await emailService.sendMail(
                SEND_TO_EMAIL,
                ADMIN_ACCOUNT_CREATED,
                { admin: loginedUser.name, name, newActionToken: `${SOME_URL}/password?token=${adminToken}` }
            );

            res.status(CREATED).json(DONE);
        } catch (e) {
            next(e);
        }
    },
};
