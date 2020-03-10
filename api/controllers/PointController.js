"use strict";


import createError from 'http-errors';
import ConnectionFactory from '../schema/ConnectionFactory.js';
import { PointSchema, PointModel } from '../schema/PointSchema.js';


class LocalisationController {

    static fetchAll(req, res) {
        ConnectionFactory.connect();
        
        PointModel.find({}, function (err, lots) {
            if (err) return createError(404, 'Ressource nof found');
            res.json(lots);
        });
    }

    static find(req, res) {
        ConnectionFactory.connect();

        LotEntranceModel.findById(req.params.id, (err, lot) => {
            if (err) return createError(404, 'Ressource nof found');
            res.json(lot);
        });
    }

    static create(req, res) {
        ConnectionFactory.connect();

        if (typeof req.body.name === 'undefined' || typeof req.body.position.latitude === 'undefined' || typeof req.body.position.longitude === 'undefined') {
            return createError(403, 'One or more parameters are missing')
        }

        const newPoint = new PointModel({
            name:       req.body.name,
            details:    req.body.details,
            position: {
                latitude:   req.body.position.latitude,
                longitude:  req.body.position.longitude
            }
        });

        newPoint.save((err) => {
            if (err) res.json(err);
            res.json(newPoint);
        });
    }

    // static update(req, res) {
    //     ConnectionFactory.connect();

    //     let updatedObject = req.body;
    //     LotEntranceModel.findByIdAndUpdate(req.params.id, updatedObject, (err, doc) => {
    //         if (err) return handleError(err);
    //         res.status(200).json(doc);
    //     });
    // }

    // static delete(req, res) {
    //     ConnectionFactory.connect();

    //     LotEntranceModel.findByIdAndDelete(req.params.id, (err) => {
    //         if (err) return handleError(err);
    //         res.status(200).json({
    //             error: {
    //                 error: 0,
    //                 message: "Successfuly delete lotEntrance with id " + req.params.id
    //             }
    //         });
    //     });
    // }

}

export default LocalisationController;