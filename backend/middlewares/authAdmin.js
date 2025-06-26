import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, login again' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);

    if (decoded.email !== process.env.ADMIN_LOGIN_EMAIL) {
      return res.status(403).json({ success: false, message: 'Not authorized, login again' });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export default authAdmin;



