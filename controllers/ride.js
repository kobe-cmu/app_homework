'use strict';

const express = require('express');
const router = express.Router();

const Ride = require('../models/ride');
const utils = require('../utils');
const ModelHandle = require('./factory');


const rideHandle = new ModelHandle(Ride, 'Ride');


router.route('/rides')

    .get((req, res) => {
        rideHandle.get()
            .then((rides) => {
                res.status(200).json(rides);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    })
  
    .post((req, res) => {
        rideHandle.create(req.body)
            .then((response) => {
                res.status(201).json(response);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    });


router.route('/rides/:ride_id')
  
    .get(function (req, res) {
        rideHandle.get(req.params.ride_id)
            .then((ride) => {
                res.status(200).json(ride);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    })
 
    .patch(function (req, res) {
        rideHandle.update(req.params.ride_id, req.body)
            .then((response) => {
                res.status(200).json(response);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    })
 
    .delete(function (req, res) {
        rideHandle.del(req.params.ride_id)
            .then((response) => {
                res.json(response);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            })
    });

module.exports = router;