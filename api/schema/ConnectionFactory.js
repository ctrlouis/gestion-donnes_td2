"use strict";


import mongoose from 'mongoose';


export class ConnectionFactory {

    static connect() {
        //Set up default mongoose connection
        const mongoDB = 'mongodb://mongo.wax:27017/wax';
        mongoose.connect(mongoDB, {
            useNewUrlParser: true
        });

        //Get the default connection
        const db = mongoose.connection;

        //Bind connection to error event (to get notification of connection errors)
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }

}