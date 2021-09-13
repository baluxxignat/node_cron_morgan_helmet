const { User } = require('../dataBase');
const { user_normalizator: { userToNormalize } } = require('../utils');
const {
    functionService,
    passwordService,
    emailService
} = require('../services');

const {
    emailActionEnum: {
        ACCOUNT_UPDATED,
        ACCOUNT_CREATED,
        ACCOUNT_DELETED_USER,
        ACCOUNT_DELETED_ADMIN
    },
    statusCodes: { CREATED, NO_CONTENT },
    // variables: { SEND_TO_EMAIL }
} = require('../config');

module.exports = {

    getAllUsers: async (req, res, next) => {
        try {
            const allUsers = await functionService.getAllItems(User, req.query);

            const normalizeAllUsers = allUsers.map((item) => userToNormalize(item));

            res.json(normalizeAllUsers);
        } catch (e) {
            next(e);
        }
    },

    getSingleUser: (req, res, next) => {
        try {
            const userNormalized = userToNormalize(req.user);

            res.json(userNormalized);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { name, password } = req.body;

            const hashedPassword = await passwordService.hashPassword(password);

            const createdUser = await functionService.createItem(User, { ...req.body, password: hashedPassword });

            const userNormalized = userToNormalize(createdUser);

            await emailService.sendMail(userNormalized.email, ACCOUNT_CREATED, { name });

            res.status(CREATED).json(userNormalized);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const { user: { name, email }, userIsLogined } = req;

            await functionService.deleteCurrentItem(User, user_id);

            if (userIsLogined) {
                await emailService.sendMail(email, ACCOUNT_DELETED_USER, { name });
                res.sendStatus(NO_CONTENT);
                return;
            }
            await emailService.sendMail(email, ACCOUNT_DELETED_ADMIN, { name });

            res.sendStatus(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const { name, email } = req.user;

            const updatedUser = await functionService.updateItem(User, user_id, req.body);

            await emailService.sendMail(email, ACCOUNT_UPDATED, { name });

            res.status(CREATED).json(updatedUser);
        } catch (e) {
            next(e);
        }
    }
};
