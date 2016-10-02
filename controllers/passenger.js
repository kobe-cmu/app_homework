'use strict';

const express = require('express');
const router = express.Router();

const Passenger = require('../models/passenger');
const PayAccount = require('../models/paymentAccount');
const utils = require('../utils');
const ModelHandle = require('./factory');


const passengerHandle = new ModelHandle(Passenger, 'Passenger');
const accountHandle = new ModelHandle(PayAccount, 'Payment Account');

router.route('/passengers')

    .get((req, res) => {
        passengerHandle.get()
            .then((passengers) => {
                res.status(200).json(passengers);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    })

    .post((req, res) => {
        passengerHandle.create(req.body)
            .then((response) => {
                res.status(201).json(response);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    });


router.route('/passengers/:passenger_id')

    .get(function (req, res) {
        passengerHandle.get(req.params.passenger_id)
            .then((passenger) => {
                res.status(200).json(passenger);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    })

    .patch(function (req, res) {
        passengerHandle.update(req.params.passenger_id, req.body)
            .then((response) => {
                res.status(200).json(response);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    })

    .delete(function (req, res) {
        passengerHandle.del(req.params.passenger_id)
            .then((response) => {
                res.json(response);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            })
    });

router.route('/passengers/:passenger_id/paymentaccounts')
    .get((req, res) => {
        PayAccount.find({passenger_id: req.params.passenger_id}, (err, account) => {
            if(err) {
                utils.handleMongooError(err, res);
                return;
            }
            res.status(200).json(account);
        })
    })
    .post((req, res) => {
        if(!req.body.expirationDate) {
            utils.handleMongooError({
                kind: 'required',
                path: req.path,
                message: 'expirationDate required'
            }, res);
            return;
        }
        passengerHandle.get(req.params.passenger_id)
            .then((driver) => {
                req.body.driver = driver._id;
                return accountHandle.create(req.body);
            })
            then((response) => {
                res.json(response);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    });
module.exports = router;