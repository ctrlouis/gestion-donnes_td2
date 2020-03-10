"use strict";

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const collection = 'lot_entrances';

export const LotEntranceSchema = new Schema({
    name: String,
    provider: String,
    provider_lot: {
        type: String,
        default: null
    },
    weight: {
        total: {
            type: Number
        },
        left: {
            type: Number,
            default: 0
        },
        melting: {
            type: Number,
            default: 0
        }
    },
    arrival_date: {
        type: Date
    },
    bio: {
        type: Boolean,
        default: false
    },
    about: {
        created: {
            type: Date,
            default: Date.now
        },
        updated: {
            type: Date,
            default: Date.now
        }
    }
});

export const LotEntranceModel = mongoose.model(collection, LotEntranceSchema);