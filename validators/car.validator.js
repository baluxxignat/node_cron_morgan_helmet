const Joi = require('joi');

const { constans: { CURRENT_YEAR } } = require('../config');

const createCarValidator = Joi.object({
    model: Joi.string().alphanum().min(2).max(110).required().trim(),
    year: Joi.number().required().max(CURRENT_YEAR),
    price: Joi.number()
});

const updateCarValidator = Joi.object({
    model: Joi.string().alphanum().min(2).max(110).trim(),
    year: Joi.number().max(CURRENT_YEAR),
    price: Joi.number()
});

const getCarValidator = Joi.object({
    car_id: Joi.string().trim().length(24).required(),
});

module.exports = {
    createCarValidator,
    updateCarValidator,
    getCarValidator,
};
