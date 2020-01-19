const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const TransactionSchema = new Schema({
  user: {
    type: String,
    required: [true, 'The user is  required']
  },
  cost: {
    type: Number,
    required: [true, 'The cost is  required']
  },
  date:{
    type:Date,
    default: Date.now,
    required: [true, 'The date is  required']
  },
  description:{
    type: String,
    required: [true, 'The description is  required']
  },
  category:{
    type: String,
    required: [true, 'The category is  required']
  },
  isExported:{
type: Boolean,
required: [true, '']

  }
})

//create model for todo
const Transaction = mongoose.model('transaction', TransactionSchema);

module.exports = Transaction;