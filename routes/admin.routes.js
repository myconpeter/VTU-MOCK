import express from 'express';
import { protect } from '../middlewares/auth.js';
import { adminGetAllTransactions } from '../controllers/admin.controller.js';

const adminRoute = express.Router();

adminRoute.get('/all-transactions', protect, adminGetAllTransactions);

export default adminRoute;
