const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      message: 'Only admins can access this resource.',
    });
  }

  next();
};

export default adminMiddleware;