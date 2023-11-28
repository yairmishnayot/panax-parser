import { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/Db';

class Transaction extends Model {
  public id!: number;
  public accountMask!: number;
  public postedDate!: Date;
  public description!: string;
  public details!: string;
  public amount!: number;
  public balance!: number;
  public referenceNumber!: string | null;
  public currency!: string;
  public type!: string;
  public createdTime!: Date;
  public updatedTime!: Date;
}

Transaction.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  accountMask: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  postedDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  details: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  referenceNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Transaction',
  timestamps: false, // Disable automatic timestamp fields
  freezeTableName: true
});

export default Transaction;
