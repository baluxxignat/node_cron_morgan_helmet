const { Schema, model } = require('mongoose');

const { dataBaseTokenEnum: { USER, ACTION_TOKEN } } = require('../config');

const ActionToken = new Schema({

    action_token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

ActionToken.pre('findOne', function() {
    this.populate('user');
});

module.exports = model(ACTION_TOKEN, ActionToken);
