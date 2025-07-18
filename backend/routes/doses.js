const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:protocolId', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM doses WHERE protocol_id = $1 ORDER BY id',
      [req.params.protocolId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching doses:', err);
    res.status(500).json({ error: 'Failed to fetch doses' });
  }
});

router.patch('/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const result = await db.query(
      'UPDATE doses SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating dose:', err);
    res.status(500).json({ error: 'Failed to update dose' });
  }
});

module.exports = router;
