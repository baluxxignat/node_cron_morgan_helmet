const router = require('express').Router();

const {
    carMiddleware: {
        validateCarForCreate,
        validateCarId,
        updateCar,
        throwError
    },
    userMiddleware: { getItemByDynamicParams }
} = require('../middlewares');

const { Car } = require('../dataBase');
const { carController } = require('../controllers');
const { functionVariables: { CAR_ID, PARAMS, ID } } = require('../config');

router.route('/')
    .get(
        carController.getAllCars
    )
    .post(
        validateCarForCreate,
        carController.createCar
    );

router.route('/:car_id')
    .get(
        validateCarId,
        getItemByDynamicParams(Car, CAR_ID, PARAMS, ID),
        throwError(),
        carController.getSingleCar
    )
    .delete(
        validateCarId,
        getItemByDynamicParams(Car, CAR_ID, PARAMS, ID),
        throwError(),
        carController.deleteCar
    )
    .put(
        validateCarId,
        updateCar,
        getItemByDynamicParams(Car, CAR_ID, PARAMS, ID),
        throwError(),
        carController.updateCar
    );

module.exports = router;
