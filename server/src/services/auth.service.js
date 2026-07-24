import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

import googleClient from '../utils/googleClient.js';
import { generateToken } from '../utils/jwt.js';
import { formatUser } from '../utils/user.js';

export { formatUser };

// =======================
// Signup
// =======================

export const register = async ({ fullName, email, password, avatar }) => {
  if (!fullName || !email || !password) {
    throw {
      statusCode: 422,
      message: 'Sabhi fields bharna zaroori hai',
    };
  }

  if (password.length < 6) {
    throw {
      statusCode: 422,
      message: 'Password kam se kam 6 characters ka hona chahiye',
    };
  }

  const existing = await User.findOne({
    where: { email },
  });

  if (existing) {
    throw {
      statusCode: 422,
      message: 'Ye email pehle se register hai',
    };
  }



  const user = await User.create({
    name: fullName,
    email,
    password,
    avatar: avatar || null,
    provider: 'email',
  });

  const token = generateToken(user);

  return {
    token,
    user: formatUser(user),
  };
};

// =======================
// Login
// =======================

export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw {
      statusCode: 422,
      message: 'Email aur password zaroori hai',
    };
  }

  const user = await User.findOne({
    where: { email },
  });

  console.log(user)

  if (!user) {
    throw {
      statusCode: 401,
      message: 'Email ya password galat hai',
    };
  }

  if (user.provider === 'google') {
    throw {
      statusCode: 400,
      message:
        "Ye account Google se bana tha — 'Continue with Google' use karo",
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);


  if (!isMatch) {
    throw {
      statusCode: 401,
      message: 'Email ya password galat hai',
    };
  }

  const token = generateToken(user);

  return {
    token,
    user: formatUser(user),
  };
};

// =======================
// Google Login / Signup
// =======================

export const googleLogin = async ({ idToken }) => {
  if (!idToken) {
    throw {
      statusCode: 422,
      message: 'idToken zaroori hai',
    };
  }

  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_WEB_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw {
      statusCode: 401,
      message: 'Google verification fail hui',
    };
  }

  const {
    sub: googleId,
    email,
    name,
    picture,
  } = payload;

  let user = await User.findOne({
    where: {
      google_id: googleId,
    },
  });

  if (!user) {
    user = await User.findOne({
      where: { email },
    });

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

  return {
    token,
    user: formatUser(user),
  };
};

export const getProfile = async (user) => {
  return {
    user: formatUser(user),
  };
};

export const logout = async () => {
  return {
    message: 'Logout ho gaya',
  };
};