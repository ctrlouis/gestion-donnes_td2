"use strict";


/**
 * import generate
 * by express-generator
 */
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

/**
 * import perso
 */
import bodyParser from 'body-parser';
import cors from 'cors';
import createError from 'http-errors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import indexRouter from './routes/index.js';
import pointRouter from './routes/pointRouter.js';


const expressPort = 8080;
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * express server
 * start here
 */
const app = express();

/**
 * middlewares set
 * by express-generator
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

/**
 * perso middleware
 */
function redirectUnmatched(req, res , next) {
    return next(createError(404, 'Not found', { expose: false }));
    next();
}

/**
 * import generate
 * by express-generator
 */
app.use(bodyParser({
    extended: false
}));
app.use(cors());
app.options('*', cors());

// routes
app.use('/', indexRouter);
app.use('/points', pointRouter);
app.use(redirectUnmatched);

app.listen(expressPort, () => {
    console.log("Server up and running at localhost: " + expressPort);
});
