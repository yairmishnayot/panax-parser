import { Dialect } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

interface DBEnvironmentConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

const env = process.env.NODE_ENV || 'development';

const baseConfig: DBEnvironmentConfig = {
  username: process.env.DB_USER || 'default_user',
  password: process.env.DB_PASSWORD || 'default_password',
  database: process.env.DB_NAME || 'default_db',
  host: process.env.DB_HOST || 'localhost',
  dialect: process.env.DB_DIALECT as Dialect || 'postgres',
};

// Add option for multiple configurations
const config: Record<string, DBEnvironmentConfig> = {
  development: baseConfig,
  test: baseConfig,
  production: baseConfig
};

module.exports = config[env];
