const router = require('express').Router();

const {
    userMiddleware: {
        validateSomeFilds,
        checkUserRole,
        getItemByDynamicParams,
        throwErrorWhenExist,
        checkUserisAdmin,
    },
    loginMiddleware: { validateAccessToken },
    fileMiddleware: { checkAvatar }
} = require('../middlewares');

const {
    functionVariables: {
        ADMIN,
        USER_ID,
        PARAMS,
        ID,
        EMAIL,
        CONFLICTED_EMAIL,
    }
} = require('../config');

const { userController, adminController } = require('../controllers');
const { userValidator: { createUserValidator, updateUserValidator, createOnlyAdmins } } = require('../validators');
const { User } = require('../dataBase');

router.route('/')
    .get(
        userController.getAllUsers
    )
    .post(
        validateSomeFilds(createUserValidator),
        checkAvatar,
        getItemByDynamicParams(User, EMAIL),
        throwErrorWhenExist(CONFLICTED_EMAIL),
        userController.createUser
    );

router.route('/:user_id')
    .get(
        getItemByDynamicParams(User, USER_ID, PARAMS, ID),
        throwErrorWhenExist(),
        userController.getSingleUser
    )
    .put(
        validateSomeFilds(updateUserValidator),
        checkAvatar,
        validateAccessToken,
        getItemByDynamicParams(User, USER_ID, PARAMS, ID),
        throwErrorWhenExist(),
        checkUserRole([ADMIN]),
        userController.updateUser
    )
    .delete(
        validateAccessToken,
        getItemByDynamicParams(User, USER_ID, PARAMS, ID),
        throwErrorWhenExist(),
        checkUserRole([ADMIN]),
        userController.deleteUser
    );

router.route('/admin')
    .post(
        validateSomeFilds(createOnlyAdmins),
        validateAccessToken,
        checkUserisAdmin,
        getItemByDynamicParams(User, EMAIL),
        throwErrorWhenExist(CONFLICTED_EMAIL),
        adminController.createnewAdmin
    );

module.exports = router;
