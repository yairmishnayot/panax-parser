const { Pool } = require('pg');
const dbConfig = require('../../config/DbConfig'); // Adjust the path as needed

const pool = new Pool(dbConfig);

module.exports = pool;
