// backend/index.js
const protocolRoutes = require('./routes/protocols');
const doseRoutes = require('./routes/doses');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/protocols', protocolRoutes);
app.use('/api/doses', doseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
