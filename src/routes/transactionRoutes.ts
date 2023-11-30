import express from 'express';
import multer from 'multer';
import { createTransactionsFromCSV, getAllTransactions } from '../controllers/TransactionController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), createTransactionsFromCSV);
router.get('/', getAllTransactions);

export default router;
