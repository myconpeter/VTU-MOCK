import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
	{
		userId: mongoose.Schema.Types.ObjectId,
		txId: String,
		amount: Number,
		requestId: String,
		status: { type: String, enum: ['pending', 'successful', 'failed'], default: 'pending' },
	},
	{ timestamps: true }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
