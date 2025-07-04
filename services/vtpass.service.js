import axios from 'axios';

const VT_PASS_BASE = 'https://sandbox.vtpass.com/api'; // or live URL
const VT_PASS_USERNAME = process.env.VTPASS_USERNAME;
const VT_PASS_PASSWORD = process.env.VTPASS_PASSWORD;

const headers = {
	'api-key': process.env.VTPASS_API_KEY,
	'Content-Type': 'application/json',
};

export const initiateVTUPayment = async ({ serviceID, phone, amount, request_id }) => {
	const response = await axios.post(
		`${VT_PASS_BASE}/pay`,
		{
			serviceID,
			request_id,
			billersCode: phone,
			variation_code: '',
			amount,
			phone,
		},
		{
			headers,
			auth: { username: VT_PASS_USERNAME, password: VT_PASS_PASSWORD },
		}
	);

	return response.data;
};

export const requeryVTUPayment = async (request_id) => {
	const response = await axios.post(
		`${VT_PASS_BASE}/requery`,
		{ request_id },
		{
			headers,
			auth: { username: VT_PASS_USERNAME, password: VT_PASS_PASSWORD },
		}
	);

	return response.data;
};
