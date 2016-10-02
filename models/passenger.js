'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseHidden = require('mongoose-hidden')();

const utils = require('../utils');

const PassengerSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 15
    },
    lastName: {
        type: String,
        minlength: 1,
        maxlength: 15
    },
    password: {
        type: String,
        hide: true,
        required: true,
        minlength: 8,
        maxlength: 16
    },
    emailAddress: {
        type: String,
        validate: [{
            validator: utils.validateEmail,
            msg: 'email address is invaild',
            type: 'notvalid'
        }, {
            validator: function (val) {
                return typeof val === 'string';
            },
            msg: 'TypeError: need to be a string',
            type: 'notvalid'
        }]
    },
    addressLine1: {
        type: String,
        maxlength: 50
    },
    addressLine2: {
        type: String,
        maxlength: 50
    },
    city: {
        type: String,
        maxlength: 50
    },
    state: {
        type: String,
        maxlength: 2
    },
    zip: {
        type: String,
        maxlength: 5
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: [{
            validator: utils.validatePhoneNo,
            msg: 'phoneNumber is invaild',
            type: 'notvalid'
        }]
    }
});

PassengerSchema.plugin(mongooseHidden);

module.exports = mongoose.model('Passenger', PassengerSchema);