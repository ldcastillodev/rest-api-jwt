import { Router } from "express";
import { getRecords, getRestaurants } from "../controller/restaurant.controller.js";
import { verifyToken } from '../middlewares/authJwt.js';

const router = Router();

router.post('/restaurants', verifyToken, getRestaurants); // route protected

router.get('/records', getRecords);


export default router;