import { Request, Response } from 'express';
import fs from 'fs';
import csvParser from 'csv-parser';
import Transaction from '../models/Transaction';
import { parse } from 'date-fns';

export const createTransactionsFromCSV = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const transactions: any[] = []; // Replace 'any' with your transaction type

  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on('data', (row) => {


      // Convert each row into a transaction and add it to the array
      const transactionData = {        
        accountMask: row['Account Mask'],
        postedDate: parse(row['Posted Date'], 'dd/MM/yyyy', new Date()).toISOString(),
        description: row['Description'],
        details: row['Details'],
        amount: row['Amount'],
        balance: row['Balance'],
        referenceNumber: row['Reference Number'],
        currency: row['currency'],
        type: row['type'],
      }
      
      transactions.push(transactionData);   
    })
    .on('end', async () => {
      try {
        // Process and save transactions to the database
        // For example, use Transaction.bulkCreate for efficiency
        await Transaction.bulkCreate(transactions);
        res.status(201).send('Transactions created successfully');
      } catch (error) {
        console.log(error)
        res.status(500).send('Error processing transactions');
      }
    });
};

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.findAll();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).send('Error retrieving transactions');
  }
};
