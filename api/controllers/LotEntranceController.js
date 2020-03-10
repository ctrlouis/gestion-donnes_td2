"use strict";


import {
    ConnectionFactory
} from './../schema/ConnectionFactory.js';
import {
    LocalisationSchema,
    LocalisationModel
} from '../schema/LocalisationSchema.js';


export class LotEntranceController {

    static all(req, res) {
        ConnectionFactory.connect();

        // find all LotEntrance
        LotEntranceModel.find({}, function (err, lots) {
            if (err) return handleError(err);

            // 'lot' contains the list of lots entrance
            res.json(lots);
        });
    }

    static id(req, res) {
        ConnectionFactory.connect();

        LotEntranceModel.findById(req.params.id, (err, lot) => {
            if (err) return handleError(err);
            res.json(lot);
        });
    }

    static create(req, res) {
        ConnectionFactory.connect();

        if (typeof req.body.name === 'undefined' || typeof req.body.provider === 'undefined' || typeof req.body.weight === 'undefined') {
            res.status(403).json({
                error: {
                    code: 300,
                    message: "Bad request : one or more parameters are missing"
                }
            });
        }

        const LotEntrance = new LotEntranceModel({
            name: req.body.name,
            provider: req.body.provider,
            weight: {
                total: req.body.weight,
                left: req.body.weight
            }
        });

        LotEntrance.save((err) => {
            if (err) return handleError(err);
            // saved!
            res.json(LotEntrance);
        });
    }

    static update(req, res) {
        ConnectionFactory.connect();

        let updatedObject = req.body;
        LotEntranceModel.findByIdAndUpdate(req.params.id, updatedObject, (err, doc) => {
            if (err) return handleError(err);
            res.status(200).json(doc);
        });
    }

    static delete(req, res) {
        ConnectionFactory.connect();

        LotEntranceModel.findByIdAndDelete(req.params.id, (err) => {
            if (err) return handleError(err);
            res.status(200).json({
                error: {
                    error: 0,
                    message: "Successfuly delete lotEntrance with id " + req.params.id
                }
            });
        });
    }

}