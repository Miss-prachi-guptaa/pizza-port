const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const googleClient = new OAuth2Client(process.env.GOOGLE_WEB_CLIENT_ID);

function formatUser(user) {
  return {
    id: user.id,
    fullName: user.name,
    email: user.email,
    avatar: user.avatar,
    provider: user.provider,
  };
}

function generateToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

// POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    const { fullName, email, password, avatar } = req.body;

    if (!fullName || !email || !password) {
      return res.status(422).json({ message: 'Sabhi fields bharna zaroori hai' });
    }
    if (password.length < 6) {
      return res.status(422).json({ message: 'Password kam se kam 6 characters ka hona chahiye' });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(422).json({ message: 'Ye email pehle se register hai' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: fullName,
      email,
      password: hashedPassword,
      avatar: avatar || null,
      provider: 'email',
    });

    const token = generateToken(user);

    return res.status(201).json({ token, user: formatUser(user) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Kuch galat ho gaya' });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: 'Email aur password zaroori hai' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Email ya password galat hai' });
    }

    if (user.provider === 'google') {
      return res.status(400).json({
        message: "Ye account Google se bana tha — 'Continue with Google' use karo",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ya password galat hai' });
    }

    const token = generateToken(user);

    return res.json({ token, user: formatUser(user) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Kuch galat ho gaya' });
  }
};

// POST /api/auth/google
exports.google = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(422).json({ message: 'idToken zaroori hai' });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_WEB_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({ message: 'Google verification fail hui' });
    }

    const { sub: googleId, email, name, picture } = payload;

    let user = await User.findOne({ where: { google_id: googleId } });

    if (!user) {
      user = await User.findOne({ where: { email } });

      if (user) {
        user.google_id = googleId;
        user.provider = 'google';
        user.avatar = user.avatar || picture;
        await user.save();
      } else {
        user = await User.create({
          name: name || '',
          email,
          google_id: googleId,
          avatar: picture,
          provider: 'google',
        });
      }
    }

    const token = generateToken(user);

    return res.json({ token, user: formatUser(user) });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Google verification fail hui' });
  }
};

// GET /api/auth/me
exports.me = async (req, res) => {
  return res.json({ user: formatUser(req.user) });
};

// POST /api/auth/logout
// JWT stateless hota hai, isliye "logout" client side pe token delete karke hota hai.
// Agar server-side invalidation chahiye to blacklist table/redis use karna padega.
exports.logout = async (req, res) => {
  return res.json({ message: 'Logout ho gaya' });
};