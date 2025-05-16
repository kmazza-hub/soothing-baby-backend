// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes');
const imageRoutes = require('./routes/imageRoutes');

app.use('/api/auth', authRoutes);       // Auth (login/register)
app.use('/api/videos', videoRoutes);    // Video routes (GET/POST/DELETE)
app.use('/api/images', imageRoutes);    // Optional: Images if used

// Health check
app.get('/', (req, res) => {
  res.send('🎉 API is running...');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB error:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
