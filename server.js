import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import { errorHandler, notFount } from './middlewares/errorMiddleware.js';
import authRoute from './routes/user.routes.js';
import walletRoute from './routes/wallet.routes.js';
import vtpassRoute from './routes/vtpass.routes.js';
import adminRoute from './routes/admin.routes.js';

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: '*',
		credentials: true,
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
	res.status(200).json({
		message: 'Backend is working',
	});
});

app.use('/api/auth', authRoute);
app.use('/api/wallet', walletRoute);
app.use('/api/vtpass', vtpassRoute);
app.use('/api/admin', adminRoute);

app.use(errorHandler);
app.use(notFount);

app.listen(PORT, async () => {
	try {
		connectDB();
		console.log(`App is running on ${PORT}`);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
});
