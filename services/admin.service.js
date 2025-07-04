import Transaction from '../models/Transaction.js';

export const getAllTransactions = async () => {
	return await Transaction.find().populate('userId', 'email role');
};
