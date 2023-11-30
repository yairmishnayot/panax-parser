import { Request, Response } from 'express';
import fs from 'fs';
import csvParser from 'csv-parser';
import Transaction from '../models/Transaction';
import { parse } from 'date-fns';

export const createTransactionsFromCSV = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const transactions: any[] = [];

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
        referenceNumber: row['Reference Number'] !== "null"? row['Reference Number'] : null,
        currency: row['currency'],
        type: row['type'],
      }
      
      transactions.push(transactionData);   
    })
    .on('end', async () => {
      try {
        for (const data of transactions) {
          let transaction;
          if (data.referenceNumber) {
            // Look for an existing transaction by referenceNumber
            transaction = await Transaction.findOne({ where: { referenceNumber: data.referenceNumber } });
          } else {
            // Look for an existing transaction by all other fields
            transaction = await Transaction.findOne({ where: { 
              accountMask: data.accountMask,
              postedDate: data.postedDate,
              description: data.description,
              details: data.details,
              amount: data.amount,
              balance: data.balance,
              currency: data.currency,
              type: data.type,              
            } });
          }

          if (transaction) {
            await transaction.update(data);
          } else {          
            await Transaction.create(data);
          }
        }
        res.status(201).send('Transactions processed successfully');
      } catch (error) {
        console.log(error)
        res.status(500).send('Error processing transactions');
      }
    });
};

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    // Fetch all transactions from the database
    const transactions = await Transaction.findAll();

    // Send the transactions back in the response
    res.status(200).json(transactions);
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error('Error fetching transactions:', error);
    res.status(500).send('Error retrieving transactions');
  }
};
