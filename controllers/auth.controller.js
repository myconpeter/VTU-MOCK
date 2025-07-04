import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { authenticateUser, createUser } from '../services/auth.services.js';

export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error('All fields are required');
	}

	const user = await createUser({ name, email, password });

	res.status(StatusCodes.CREATED).json({
		message: 'User registered successfully',
		user: {
			id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		},
	});
});

export const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400);
		throw new Error('Email and password are required');
	}

	const { user, token } = await authenticateUser({ email, password });

	return res
		.cookie('accessToken', token)
		.status(StatusCodes.OK)
		.json({
			message: 'Login successful',
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
});
