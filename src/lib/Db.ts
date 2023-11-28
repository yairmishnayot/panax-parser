import { Pool } from 'pg';
import dbConfig from '../config/DbConfig';

const pool = new Pool(dbConfig);

export default pool;
