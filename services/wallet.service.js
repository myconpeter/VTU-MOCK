import axios from 'axios';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

export const initializePayment = async ({ amount, email }) => {
	const response = await axios.post(
		'https://api.paystack.co/transaction/initialize',
		{
			amount: amount * 100, // Paystack uses kobo
			email,
			callback_url: 'http://localhost:5000/api/wallet/verify-payment',
		},
		{
			headers: {
				Authorization: `Bearer ${PAYSTACK_SECRET}`,
				'Content-Type': 'application/json',
			},
		}
	);

	return response.data;
};

export const verifyPayment = async (reference) => {
	const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
		headers: {
			Authorization: `Bearer ${PAYSTACK_SECRET}`,
		},
	});

	return response.data;
};
