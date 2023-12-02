import fs from 'fs';
import csvParser from 'csv-parser';
import { parse } from 'date-fns';
import Transaction from '../models/Transaction';
import validator from 'validator';
import xssFilters from 'xss-filters';

class TransactionService {
  async processTransactionsFromCSV(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const transactions: any[] = [];

      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
          try {
            const transactionData = {
              accountMask: this.validateAndSanitizeAccountMask(row['Account Mask']),
              postedDate: parse(this.validateAndSanitizePostedDate(row['Posted Date']), 'dd/MM/yyyy', new Date()).toISOString(),
              description: xssFilters.inHTMLData(row['Description']),
              details: xssFilters.inHTMLData(row['Details']),
              amount: this.validateAndSanitizeAmount(row['Amount']),
              balance: this.validateAndSanitizeBalance(row['Balance']),
              referenceNumber: row['Reference Number'] !== "null" 
                           ? xssFilters.inHTMLData(row['Reference Number']) 
                           : null,
              currency: row['currency'],
              type: xssFilters.inHTMLData(row['type']),
            };
            transactions.push(transactionData);
            
          } catch (error) {
            reject(error)
          }
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

  validateAndSanitizeAccountMask(input: string): string {            
    if(!validator.isNumeric(input)){
      throw Error(`Account mask must be numeric. Actual account mask: ${input}`)
    };

    return input;
  }

  validateAndSanitizePostedDate(input: string): string {  
    if (!validator.isDate(input, { format: 'dd/MM/yyyy' })) {
      throw Error(`Post date must be of format dd/MM/yyyy. Actual post date: ${input}`)
    }
    return input;
  }

  validateAndSanitizeAmount(input: string): string {  
    if (!validator.isDecimal(input)) {
      throw Error(`The amount field must be decimal. Actual amount: ${input}`)
    }
    return input
  }

  validateAndSanitizeBalance(input: string): string {
    if (!validator.isDecimal(input)) {
      throw Error(`The balance field must be decimal. Actual balance: ${input}`)
    }
    return input
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return Transaction.findAll();
  }
}

export default new TransactionService();
