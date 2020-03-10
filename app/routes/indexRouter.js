"use strict";


import express from 'express';
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.html.pug', {
        title: 'TD2 | Bertschy Louis'
    });
});


export default router;
