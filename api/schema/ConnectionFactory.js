"use strict";


import mongoose from 'mongoose';


class ConnectionFactory {

    static connect() {
        //Set up default mongoose connection
        const mongoDB = 'mongodb://mongo.localisation:27017/localisation';
        mongoose.connect(mongoDB, {
            useNewUrlParser: true
        });

        //Get the default connection
        const db = mongoose.connection;

        //Bind connection to error event (to get notification of connection errors)
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }

}

export default ConnectionFactory;