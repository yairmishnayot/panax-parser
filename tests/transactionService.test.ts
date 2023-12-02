import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });
import transactionService from '../src/services/TransactionService';

describe('TransactionService', () => {
  it('processes a CSV file correctly', async () => {
    const filePath = './tests/mocks/testFile.csv';
    await transactionService.processTransactionsFromCSV(filePath);
  });
});
