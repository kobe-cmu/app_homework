'use strict';

const express = require('express');
const router = express.Router();

const Driver = require('../models/driver');
const Car = require('../models/car');
const PayAccount = require('../models/paymentAccount');

const utils = require('../utils');
const ModelHandle = require('./factory');


const driverHandle = new ModelHandle(Driver, 'Driver');
const carHandle = new ModelHandle(Car, 'Car');
const accountHandle = new ModelHandle(PayAccount, 'Payment Account');

router.route('/drivers')
    .get((req, res) => {
        driverHandle.get()
            .then((drivers) => {
                res.status(200).json(drivers);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    })

    .post((req, res) => {
        driverHandle.create(req.body)
            .then((response) => {
                res.status(201).json(response);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    });


router.route('/drivers/:driver_id')
  
    .get(function (req, res) {
        driverHandle.get(req.params.driver_id)
            .then((driver) => {
                res.status(200).json(driver);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    })
  
    .patch(function (req, res) {
        driverHandle.update(req.params.driver_id, req.body)
            .then((response) => {
                res.status(200).json(response);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    })
 
    .delete(function (req, res) {
        driverHandle.del(req.params.driver_id)
            .then((response) => {
                res.json(response);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            })
    });


router.route('/drivers/:driver_id/cars')
    .get((req, res) => {
        Car.find({driver: req.params.driver_id}, (err, cars) => {
            if(err) {
                utils.handleMongooError(err, res);
                return;
            }
            res.status(200).json(car);
        })
    })
    .post((req, res) => {
        driverHandle.get(req.params.driver_id)
            .then((driver) => {
                req.body.driver = driver._id;
                return carHandle.create(req.body);
            })
            then((response) => {
                res.json(response);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    });

router.route('/drivers/:driver_id/paymentaccounts')
    .get((req, res) => {
        PayAccount.find({driver_id: req.params.driver_id}, (err, account) => {
            if(err) {
                utils.handleMongooError(err, res);
                return;
            }
            res.status(200).json(account);
        })
    })
    .post((req, res) => {
        if(!req.body.bank) {
            utils.handleMongooError({
                kind: 'required',
                path: req.path,
                message: 'bank required'
            }, res);
            return;
        }
        driverHandle.get(req.params.driver_id)
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