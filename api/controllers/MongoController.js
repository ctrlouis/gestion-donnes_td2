"use strict";


import MongoClient from 'mongodb';
import assert from 'assert';


export class MongoController {

    constructor() {
        // do something here...
    }

    static connect() {
        return new Promise((resolve, reject) => {
            // Connection URL
            const url = 'mongodb://localhost:27027';
            // Database Name
            const dbName = 'wax';

            // Use connect method to connect to the server
            MongoClient.connect(url, function(err, client) {
                assert.equal(null, err);
                console.log("Connected successfully to server");

                const db = client.db(dbName);

                const mongo = {
                    db: db,
                    client: client
                }

                resolve(mongo);
            });
        });
    }

    static findDocuments(db, callback, query = {}) {
        return new Promise((resolve, reject) => {
            // Get the documents collection
            const collection = db.collection('lot_entrance');
            // Find some documents
            collection.find(query).toArray(function(err, docs) {
                assert.equal(err, null);
                // console.log("Found the following records");
                resolve(callback(docs));
            });
        })
    }

    static insertDocuments(db, callback, datas) {
        return new Promise((resolve, reject) => {
            // Get the documents collection
            const collection = db.collection('lot_entrance');

            // test if datas is a single object (so, not an array of objets)
            if (!Array.isArray(datas)) {
                // put object into an array
                datas = [datas];
            }

            // Insert some documents
            collection.insertMany(datas, function(err, result) {
                console.log("Inserted " + result.ops.length + " documents into the collection");
                resolve(callback(result));
            });
        });
    }

    static removeDocument(db, callback) {
        return new Promise((resolve, reject) => {
            // Get the documents collection
            const collection = db.collection('documents');
            // Delete document where a is 3
            collection.deleteOne({
                a: 3
            }, function(err, result) {
                resolve(callback(result));
            });
        });
    }

}
