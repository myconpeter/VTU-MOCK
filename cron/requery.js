import cron from 'node-cron';
import Transaction from '../models/Transaction.js';
import Wallet from '../models/Wallet.js';
import { requeryPaystack } from '../services/paystack.service.js';

cron.schedule('*/5 * * * *', async () => {
	console.log('Paystack requery cron started...');
	const pendingTxs = await Transaction.find({ status: 'pending' });

	for (let tx of pendingTxs) {
		try {
			const result = await requeryPaystack(tx.txId);

			if (result.data.status === 'success') {
				await Wallet.findOneAndUpdate(
					{ userId: tx.userId },
					{ $inc: { balance: tx.amount } },
					{ upsert: true }
				);

				tx.status = 'successful';
				await tx.save();

				console.log(`Credited wallet for TX: ${tx.txId}`);
			}
		} catch (err) {
			console.error(`Error checking tx ${tx.txId}:`, err.message);
		}
	}
});
