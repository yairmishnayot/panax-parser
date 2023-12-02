import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });
import request from 'supertest';
import app from '../src/app';

describe('GET /transactions', () => {
  it('should return a list of transactions', async () => {
    const response = await request(app).get('/transactions');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
