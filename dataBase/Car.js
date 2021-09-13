const { Schema, model } = require('mongoose');
const { functionVariables: { CAR } } = require('../config');

const carShema = new Schema({
    model: {
        type: String,
        required: true,
        trim: true
    },

    year: {
        type: Number,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        trim: true
    },

}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model(CAR, carShema);
