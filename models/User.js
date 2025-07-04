import mongoose from 'mongoose';
import { compareValue, hashValue } from '../utils/bcrypt.js';
compareValue;

const UserSchema = new mongoose.Schema(
	{
		name: String,
		email: String,
		password: String,
		role: { type: String, enum: ['user', 'admin'], default: 'user' },
	},
	{ timestamps: true }
);

UserSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await hashValue(this.password);
	}
	next();
});

UserSchema.methods.comparePassword = async function (value) {
	return compareValue(value, this.password);
};

UserSchema.set('toJSON', {
	transform: function (doc, ret) {
		delete ret.password;
		delete ret.userPreferences.twoFactor;
		return ret;
	},
});

const User = mongoose.model('User', UserSchema);

export default User;
