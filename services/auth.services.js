import User from '../models/User.js';
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

export const createUser = async ({ name, email, password }) => {
	const existing = await User.findOne({ email });
	if (existing) throw new Error('User already exists');

	const user = await User.create({
		name,
		email,
		password,
		role: 'user',
	});

	return user;
};

export const authenticateUser = async ({ email, password }) => {
	const user = await User.findOne({ email });
	if (!user) throw new Error('Invalid email or password');

	const isMatch = await user.comparePassword(password);
	if (!isMatch) throw new Error('Invalid email or password');

	const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
		expiresIn: '1d',
	});

	return { user, token };
};
