interface ITransaction {
  id: number;
  accountNumber: string;
  date: Date;
  description: string;
  amount: number;
  balance: number;
}

class Transaction implements ITransaction {
  constructor(
    public id: number,
    public accountNumber: string,
    public date: Date,
    public description: string,
    public amount: number,
    public balance: number
  ) {}
}
