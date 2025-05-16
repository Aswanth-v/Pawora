const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  razorpay_order_id: { type: String, unique: true },
  razorpay_payment_id: { type: String, unique: true },
  razorpay_signature: { type: String, unique: true },
  amount: Number,
  currency: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);

export default transaction;