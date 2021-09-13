const { Schema, model } = require('mongoose');

const { dataBaseTokenEnum: { USER, ADMIN_TOKEN } } = require('../config');

const AdminToken = new Schema({

    admin_token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

AdminToken.pre('findOne', function() {
    this.populate('user');
});

module.exports = model(ADMIN_TOKEN, AdminToken);
