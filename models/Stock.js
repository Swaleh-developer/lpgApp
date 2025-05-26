const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  type: { type: String, enum: ['incoming', 'outgoing', 'sale', 'return'], required: true },
  size: { type: String, enum: ['6KG', '13KG', '35KG', '50KG'], required: true },
  quantity: { type: Number, required: true, min: 1 },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Stock', stockSchema);