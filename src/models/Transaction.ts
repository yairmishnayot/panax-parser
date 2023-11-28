export interface ITransaction {
  accountMask: number;         
  postedDate: Date;           
  description: string;        
  details: string;             
  amount: number;             
  balance: number;            
  referenceNumber: string | null; 
  currency: string;            
  type: string;               
  createdTime: Date;          
  updatedTime: Date;         
}

export class Transaction implements ITransaction {
  constructor(
    public accountMask: number,
    public postedDate: Date,
    public description: string,
    public details: string,
    public amount: number,
    public balance: number,
    public referenceNumber: string | null,
    public currency: string,
    public type: string,
    public createdTime: Date = new Date(),
    public updatedTime: Date = new Date()
  ) {}
}
