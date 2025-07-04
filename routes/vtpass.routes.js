import express from 'express';
import { handleVTUPayment, handleRequery } from '../controllers/vtpass.controller.js';
import { protect } from '../middlewares/auth.js';

const vtpassRoute = express.Router();

vtpassRoute.post('/pay', protect, handleVTUPayment);
vtpassRoute.get('/requery', protect, handleRequery);

export default vtpassRoute;
