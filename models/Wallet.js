import mongoose from 'mongoose';

const WalletSchema = new mongoose.Schema(
	{
		userId: mongoose.Schema.Types.ObjectId,
		balance: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

const Wallet = mongoose.model('Wallet', WalletSchema);

export default Wallet;
