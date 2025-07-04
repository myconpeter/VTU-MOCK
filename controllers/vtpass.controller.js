import asyncHandler from 'express-async-handler';
import { initiateVTUPayment, requeryVTUPayment } from '../services/vtpass.service.js';
import Transaction from '../models/Transaction.js';

export const handleVTUPayment = asyncHandler(async (req, res) => {
	const { amount, phone, serviceID } = req.body;
	const userId = req.user._id;

	if (!amount || !phone || !serviceID) {
		res.status(400);
		throw new Error('Missing required fields: amount, phone, serviceID');
	}

	const requestId = 'REQ-' + Date.now();

	const vtpassRes = await initiateVTUPayment({
		amount,
		phone,
		serviceID,
		request_id: requestId,
	});

	const vtStatus =
		vtpassRes.code === '000' ? 'successful' : vtpassRes.code === '099' ? 'pending' : 'failed';

	const txId = vtpassRes?.transactionId || 'TX-' + Date.now();

	await Transaction.create({
		userId,
		amount,
		status: vtStatus,
		txId,
		requestId,
	});

	res.status(200).json({
		message: 'VTU request processed',
		status: vtStatus,
		txId,
		requestId,
		raw: vtpassRes,
	});
});

export const handleRequery = asyncHandler(async (req, res) => {
	const { request_id } = req.query;
	if (!request_id) {
		res.status(400);
		throw new Error('request_id is required');
	}

	const vtpassRes = await requeryVTUPayment(request_id);

	res.status(200).json({
		message: 'VTpass requery result',
		result: vtpassRes,
	});
});
