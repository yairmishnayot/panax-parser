import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import transactionRoutes from './routes/transactionRoutes';

const app = express();

// Other middleware (like bodyParser, if needed)

app.use('/transactions', transactionRoutes);

// Other routes and error handling

export default app;

const PORT: number | string = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
