require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER || "default_user",
    "password": process.env.DB_PASSWORD || "default_password",
    "database": process.env.DB_NAME || "default_db",
    "host": process.env.DB_HOST || "localhost",
    "dialect": "postgres",
  }
};
