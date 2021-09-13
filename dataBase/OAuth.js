const { Schema, model } = require('mongoose');

const { dataBaseTokenEnum: { USER, OAUTH } } = require('../config');

const OAuthShema = new Schema({
    access_token: {
        type: String,
        required: true
    },

    refresh_token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

OAuthShema.pre('findOne', function() {
    this.populate('user');
});

module.exports = model(OAUTH, OAuthShema);
