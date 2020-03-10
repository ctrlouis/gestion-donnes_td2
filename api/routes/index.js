"use strict";


import express from 'express';
const router = express.Router();


/* GET succes connection message */
router.get('/', function(req, res, next) {
    res.send('Successfully connected to the api ! \\(^ヮ^)/');
});


export default router;
