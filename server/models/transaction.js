// models/transaction.js
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  receipt: {
    type: String,
  },
  orderId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
  },
  status: {
    type: String,
    default: 'created',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
