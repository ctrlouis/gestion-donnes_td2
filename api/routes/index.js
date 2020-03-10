"use strict";


import express from 'express';
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Successfully connected to the wax api ! \\(^ヮ^)/');
});


export default router;
