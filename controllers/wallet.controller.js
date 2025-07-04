import asyncHandler from 'express-async-handler';
import { initializePayment, verifyPayment } from '../services/wallet.service.js';
import Transaction from '../models/Transaction.js';
import Wallet from '../models/Wallet.js';

export const initiateFunding = asyncHandler(async (req, res) => {
	const { amount } = req.body;
	const email = req.user.email;

	const result = await initializePayment({ amount, email });

	// Store transaction as pending
	await Transaction.create({
		userId: req.user._id,
		amount,
		status: 'pending',
		txId: result.data.reference,
		requestId: result.data.access_code,
	});

	res.status(200).json({
		authorization_url: result.data.authorization_url,
	});
});

export const confirmFunding = asyncHandler(async (req, res) => {
	const { reference } = req.query;
	const result = await verifyPayment(reference);

	if (result.data.status === 'success') {
		const tx = await Transaction.findOne({ txId: reference });
		if (!tx || tx.status === 'successful') return res.status(200).send('Already processed');

		// Credit wallet
		await Wallet.findOneAndUpdate(
			{ userId: tx.userId },
			{ $inc: { balance: tx.amount } },
			{ upsert: true }
		);

		tx.status = 'successful';
		await tx.save();

		res.status(200).send('Wallet funded successfully');
	} else {
		res.status(400).send('Payment verification failed');
	}
});
