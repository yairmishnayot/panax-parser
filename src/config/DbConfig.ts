// config/DbConfig.ts

import { Dialect, Options } from 'sequelize';

interface DBConfig extends Options {
    database: string;
    username: string;
    password: string;
}

const dbConfig: DBConfig = {
    database: process.env.DB_NAME || 'default_db',
    username: process.env.DB_USER || 'default_user',
    password: process.env.DB_PASSWORD || 'default_password',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT as Dialect || 'postgres',
    logging: false
};

export default dbConfig;
