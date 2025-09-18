const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ msg: 'Tidak ada token, otorisasi ditolak.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ msg: 'Akses ditolak.' });
      }

      next();
    } catch (e) {
      return res.status(401).json({ msg: 'Token tidak valid.' });
    }
  };
};

module.exports = authMiddleware;