const { functionService } = require('../services');
const { Car } = require('../dataBase');
const { statusCodes: { CREATED, NO_CONTENT } } = require('../config');

module.exports = {

    getAllCars: async (req, res, next) => {
        try {
            const allCars = await functionService.getAllItems(Car, req.query);

            res.json(allCars);
        } catch (e) {
            next(e);
        }
    },

    getSingleCar: (req, res, next) => {
        try {
            res.json(req.car);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const createdCar = await functionService.createItem(Car, req.body);

            res.status(CREATED).json(createdCar);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            await functionService.deleteCurrentItem(Car, car_id);

            res.sendStatus(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const updatedCar = await functionService.updateItem(Car, car_id, req.body);

            res.status(CREATED).json(updatedCar);
        } catch (e) {
            next(e);
        }
    }
};
