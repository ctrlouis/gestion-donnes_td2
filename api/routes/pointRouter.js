"use strict";


import express from 'express';
import PointController from '../controllers/PointController.js';
const router = express.Router();


/* GET Fetch all data */
router.get('/', PointController.fetchAll);

/* GET Fetch one specific element */
router.get('/init', PointController.init);

/* GET Fetch one specific element */
router.get('/:id', PointController.find);

/* POST Create connection message */
router.post('/', PointController.create);


export default router;
