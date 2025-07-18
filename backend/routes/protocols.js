const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM protocols');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching protocols:', err);
    res.status(500).json({ error: 'Failed to fetch protocols' });
  }
});

module.exports = router;
