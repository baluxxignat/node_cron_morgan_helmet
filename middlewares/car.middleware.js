const { ErrorHandler } = require('../errors');
const { messages: { M_NOT_FOUND }, statusCodes: { BAD_REQUEST, NOT_FOUND } } = require('../config');
const { carValidator } = require('../validators');

module.exports = {

    validateCarForCreate: (req, res, next) => {
        try {
            const { error } = carValidator.createCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    updateCar: (req, res, next) => {
        try {
            const { error } = carValidator.updateCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateCarId: (req, res, next) => {
        try {
            const { error } = carValidator.getCarValidator.validate(req.params);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    throwError: () => (req, res, next) => {
        try {
            const { car } = req;

            if (!car) {
                return next(new ErrorHandler(NOT_FOUND, M_NOT_FOUND));
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
