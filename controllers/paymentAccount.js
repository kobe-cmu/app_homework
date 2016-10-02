'use strict';

const express = require('express');
const router = express.Router();

const PayAccount = require('../models/paymentAccount');
const utils = require('../utils');
const ModelHandle = require('./factory');


const accountHandle = new ModelHandle(PayAccount, 'Payment Account');


router.route('/paymentaccounts')

    .get((req, res) => {
        accountHandle.get()
            .then((paymentaccounts) => {
                res.status(200).json(paymentaccounts);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    })

    .post((req, res) => {
        accountHandle.create(req.body)
            .then((response) => {
                res.status(201).json(response);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    });


router.route('/paymentaccounts/:account_id')

    .get(function (req, res) {
        accountHandle.get(req.params.account_id)
            .then((account) => {
                res.status(200).json(account);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    })

    .patch(function (req, res) {
        accountHandle.update(req.params.account_id, req.body)
            .then((response) => {
                res.status(200).json(response);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            });
    })
 
    .delete(function (req, res) {
        accountHandle.del(req.params.account_id)
            .then((response) => {
                res.json(response);
            })
            .catch((err) => {
                utils.handleMongooError(err, res);
            })
    });

module.exports = router;