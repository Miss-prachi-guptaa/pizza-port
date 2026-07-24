import * as authService from '../services/auth.service.js';

// POST /api/v1/auth/register
export const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || 'Something went wrong',
    });
  }
};

// POST /api/v1/auth/login
export const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || 'Something went wrong',
    });
  }
};

// POST /api/v1/auth/google
export const googleLogin = async (req, res) => {
  try {
    const result = await authService.googleLogin(req.body);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || 'Something went wrong',
    });
  }
};

// GET /api/v1/auth/me
export const me = async (req, res) => {
  try {
    const result = await authService.getProfile(req.user);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || 'Something went wrong',
    });
  }
};

// POST /api/v1/auth/logout
export const logout = async (req, res) => {
  try {
    const result = await authService.logout();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || 'Something went wrong',
    });
  }
};