import { Request, Response } from 'express';
import transactionService from '../services/TransactionService';
import { infoLogger, errorLogger } from '../config/logger'

export const createTransactionsFromCSV = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    await transactionService.processTransactionsFromCSV(req.file.path);
    infoLogger.info('Transactions processed successfully');
    res.status(201).send('Transactions processed successfully');
  } catch (error) {
    errorLogger.error('Error processing transactions:', error);
    res.status(500).send('Error processing transactions');
  }
};

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await transactionService.getAllTransactions();
    res.status(200).json(transactions);
  } catch (error) {
    errorLogger.error('Error fetching transactions:', error);
    res.status(500).send('Error retrieving transactions');
  }
};
