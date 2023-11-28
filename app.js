// app.js
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Set up PostgreSQL connection
const pool = new Pool({
    user: 'postgres',     // Your PostgreSQL username
    host: 'localhost',  // Your PostgreSQL server host
    database: 'postgres',   // Your PostgreSQL database name
    password: 'secret', // Your PostgreSQL password
    port: 5432,         // Your PostgreSQL port
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to PostgreSQL DB. Server time:', res.rows[0].now);
    }
});

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
