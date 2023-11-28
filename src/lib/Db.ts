// lib/Db.ts

import { Sequelize } from 'sequelize';
import dbConfig from '../config/DbConfig';

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
);

export default sequelize;
