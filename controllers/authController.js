const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// Helper to create token + payload
const generateToken = (user) => {
  const payload = { _id: user._id, email: user.email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
  return { user: payload, token };
};

// Register new user
exports.register = async (req, res) => {
  const { email, password } = req.body;
  console.log("📥 Registration attempt:", { email, password: password ? '***' : null });

  // ✅ Validate input
  if (!email || !password) {
    console.log("❌ Missing email or password");
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ Email already registered:", email);
      return res.status(400).json({ error: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, passwordHash });

    const { user, token } = generateToken(newUser);

    console.log("✅ Registration success:", user.email);
    res.status(201).json({ user, token });
  } catch (err) {
    console.error("💥 Registration error:", err.message);
    res.status(500).json({ error: "Registration failed" });
  }
};

// Login existing user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("🔐 Login attempt:", { email, password: password ? '***' : null });

  // ✅ Validate input
  if (!email || !password) {
    console.log("❌ Missing email or password");
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ Email not found:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      console.log("❌ Password mismatch for:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const { user: userPayload, token } = generateToken(user);

    console.log("✅ Login success:", user.email);
    res.status(200).json({ user: userPayload, token });
  } catch (err) {
    console.error("💥 Login error:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
};
