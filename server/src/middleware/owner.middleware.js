const ownerMiddleware = (req, res, next) => {
  if (req.user.role !== 'owner') {
    return res.status(403).json({
      message: 'Only restaurant owners can access this resource.',
    });
  }

  next();
};

export default ownerMiddleware;