/** 
 * Express Route: /cars
 * importan: this is under the teaching of Hector
 * @version 0.0.3
 */

'use strict';

const express = require('express');
const router = express.Router();

const Car = require('../models/car');
const utils = require('../utils');

const ModelHandle = require('./factory');

const carHandle = new ModelHandle(Car, 'Car');

router.route('/cars')
   
    .get((req, res) => {
        carHandle.get()
            .then((cars) => {
                res.status(200).json(cars);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    })
 
    .post((req, res) => {
        carHandle.create(req.body)
            .then((response) => {
                res.status(201).json(response);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    });


router.route('/cars/:car_id')
  
    .get(function (req, res) {
        carHandle.get(req.params.car_id)
            .then((car) => {
                res.status(200).json(car);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    })
  
    .patch(function (req, res) {
        carHandle.update(req.params.car_id, req.body)
            .then((response) => {
                res.status(200).json(response);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    })
 
    .delete(function (req, res) {
        carHandle.del(req.params.car_id)
            .then((response) => {
                res.json(response);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            })
    });

module.exports = router;