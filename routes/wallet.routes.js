import express from 'express';
import { protect } from '../middlewares/auth.js';
import { initiateFunding, confirmFunding } from '../controllers/wallet.controller.js';

const walletRoute = express.Router();

walletRoute.post('/fund-wallet', protect, initiateFunding);
walletRoute.get('/verify-payment', confirmFunding);

export default walletRoute;
