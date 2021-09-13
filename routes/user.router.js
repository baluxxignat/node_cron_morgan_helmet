const router = require('express').Router();

const { User } = require('../dataBase');
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
const {
    userMiddleware: {
        validateSomeFilds,
        checkUserRole,
        getItemByDynamicParams,
        throwErrorWhenExist,
        checkUserisAdmin
    },
    loginMiddleware: { validateAccessToken }
} = require('../middlewares');

router.get('/',
    userController.getAllUsers);

router.post('/',
    validateSomeFilds(createUserValidator),
    getItemByDynamicParams(User, EMAIL),
    throwErrorWhenExist(CONFLICTED_EMAIL),
    userController.createUser);

router.get('/:user_id',
    getItemByDynamicParams(User, USER_ID, PARAMS, ID),
    throwErrorWhenExist(),
    userController.getSingleUser);

router.delete('/:user_id',
    validateAccessToken,
    getItemByDynamicParams(User, USER_ID, PARAMS, ID),
    throwErrorWhenExist(),
    checkUserRole([ADMIN]),
    userController.deleteUser);

router.put('/:user_id',
    validateSomeFilds(updateUserValidator),
    validateAccessToken,
    getItemByDynamicParams(User, USER_ID, PARAMS, ID),
    throwErrorWhenExist(),
    checkUserRole([ADMIN]),
    userController.updateUser);

router.post('/admin',
    validateSomeFilds(createOnlyAdmins),
    validateAccessToken,
    checkUserisAdmin,
    getItemByDynamicParams(User, EMAIL),
    throwErrorWhenExist(CONFLICTED_EMAIL),
    adminController.createnewAdmin);

module.exports = router;
