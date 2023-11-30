import fs from 'fs';
import csvParser from 'csv-parser';
import { parse } from 'date-fns';
import Transaction from '../models/Transaction';

class TransactionService {
  async processTransactionsFromCSV(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const transactions: any[] = [];

      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
          const transactionData = {
            accountMask: row['Account Mask'],
            postedDate: parse(row['Posted Date'], 'dd/MM/yyyy', new Date()).toISOString(),
            description: row['Description'],
            details: row['Details'],
            amount: row['Amount'],
            balance: row['Balance'],
            referenceNumber: row['Reference Number'] !== "null" ? row['Reference Number'] : null,
            currency: row['currency'],
            type: row['type'],
          };
          transactions.push(transactionData);
        })
        .on('end', async () => {
          try {
            for (const data of transactions) {
              await this.upsertTransaction(data);
            }
            resolve();
          } catch (error) {
            reject(error);
          }
        });
    });
  }

  async upsertTransaction(data: any): Promise<void> {
    let transaction = data.referenceNumber
      ? await Transaction.findOne({ where: { referenceNumber: data.referenceNumber } })
      : await Transaction.findOne({ where: {
        accountMask: data.accountMask,
        postedDate: data.postedDate,
        description: data.description,
        details: data.details,
        amount: data.amount,
        balance: data.balance,
        currency: data.currency,
        type: data.type          
      }});

    if (transaction) {
      await transaction.update(data);
    } else {
      await Transaction.create(data);
    }
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return Transaction.findAll();
  }
}

export default new TransactionService();
