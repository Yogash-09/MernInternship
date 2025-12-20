// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const pollRoutes = require('./routes/pollRoutes');
const optionRoutes = require('./routes/optionRoutes');
const voteRoutes = require('./routes/voteRoutes');
const debugRoutes = require('./routes/debugRoutes');

require('dotenv').config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/options', optionRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/debug', debugRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});