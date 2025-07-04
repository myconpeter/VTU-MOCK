import bcrypt from 'bcryptjs';

const hashValue = async (value, saltRounds = 10) => await bcrypt.hash(value, saltRounds);

const compareValue = async (value, hashValue) => await bcrypt.compare(value, hashValue);

export { hashValue, compareValue };
