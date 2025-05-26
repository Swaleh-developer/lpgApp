const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');

// Add stock movement
router.post('/', async (req, res) => {
  try {
    const { type, size, quantity } = req.body;
    if (!['incoming', 'outgoing', 'sale', 'return'].includes(type) ||
        !['6KG', '13KG', '35KG', '50KG'].includes(size) ||
        !Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    const stock = new Stock({ type, size, quantity });
    await stock.save();
    res.status(201).json(stock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all stock movements
router.get('/', async (req, res) => {
  try {
    const stocks = await Stock.find().sort({ date: -1 });
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get dashboard summary
router.get('/summary', async (req, res) => {
  try {
    const stocks = await Stock.find();
    const summary = {
      '6KG': { incoming: 0, outgoing: 0, sale: 0, return: 0, current: 0 },
      '13KG': { incoming: 0, outgoing: 0, sale: 0, return: 0, current: 0 },
      '35KG': { incoming: 0, outgoing: 0, sale: 0, return: 0, current: 0 },
      '50KG': { incoming: 0, outgoing: 0, sale: 0, return: 0, current: 0 },
    };

    stocks.forEach(stock => {
      summary[stock.size][stock.type] += stock.quantity;
      if (stock.type === 'incoming') summary[stock.size].current += stock.quantity;
      if (stock.type === 'outgoing' || stock.type === 'sale') summary[stock.size].current -= stock.quantity;
      if (stock.type === 'return') summary[stock.size].current += stock.quantity;
    });

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;