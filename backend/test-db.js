// backend/test-db.js
const pool = require('./db');

(async () => {
  try {
    const result = await pool.query('SELECT * FROM protocols');
    console.log('✅ Database connected. Sample protocols:', result.rows);
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  } finally {
    pool.end();
  }
})();
