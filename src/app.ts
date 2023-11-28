const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

// Define your routes here
// Example: app.use('/api/transactions', require('./routes/transactionRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
