"use strict";

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const collection = 'points_interests';

export const PointSchema = new Schema({
    name: { type: String, required: true },
    details: { type: String, default: null },
    adresse: { type: String, default: null },
    infos: {
        hours: {
            start: { type: String, default: null },
            end: { type: String, default: null }
        },
        url: { type: String, default: null }
    },
    position: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    categorie: { type: String, default: null }
});

export const PointModel = mongoose.model(collection, PointSchema);