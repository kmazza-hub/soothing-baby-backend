require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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
const cors = require('cors');

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://your-frontend.netlify.app',
  credentials: true,
}));

app.use(express.json());

// ✅ Routes
const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes');
const imageRoutes = require('./routes/imageRoutes');

app.use('/api/auth', authRoutes);       // Auth (login/register)
app.use('/api/videos', videoRoutes);    // Video routes (GET/POST/DELETE)
app.use('/api/images', imageRoutes);    // Optional: Images if used

// ✅ Health Check
app.get('/', (req, res) => {
  res.send('🎉 API is running...');
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
