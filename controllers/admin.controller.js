import asyncHandler from 'express-async-handler';
import { getAllTransactions } from '../services/admin.service.js';

export const adminGetAllTransactions = asyncHandler(async (req, res) => {
	// Check if the user is admin
	if (req.user.role !== 'admin') {
		res.status(403);
		throw new Error('Access denied. Admins only.');
	}

	const transactions = await getAllTransactions();
	res.status(200).json(transactions);
});
