import express, { Express, Request, Response } from 'express';

const app: Express = express();
const PORT: number | string = process.env.PORT || 3000;

app.use(express.json());

// Define routes here
// Example: app.use('/api/transactions', transactionRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
