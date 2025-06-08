require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes'); // ✅ Centralized route index

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

// ✅ Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://your-frontend.netlify.app',
  credentials: true,
}));
app.use(express.json());

// ✅ Unified Routes Entry
app.use('/api', routes);

// ✅ Health Check
app.get('/', (req, res) => {
  res.send('🎉 API is running...');
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
