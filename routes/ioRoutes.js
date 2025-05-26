const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// POST /write
router.post('/write', (req, res) => {
  const { filename, content } = req.body;

  if (!filename || !content) {
    return res.status(400).json({ error: 'Filename and content are required' });
  }

  const filePath = path.join('data', filename);

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return res.status(500).json({ error: 'Failed to write file' });
    }
    res.status(200).json({ message: 'File written successfully' });
  });
});

// GET /read/:filename
router.get('/read/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join('data', filename);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).json({ error: 'File not found' });
      }
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Failed to read file' });
    }
    res.status(200).send(data);
  });
});

module.exports = router;
