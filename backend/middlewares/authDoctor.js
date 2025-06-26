
import jwt from 'jsonwebtoken';

const authDoctor = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, login again'
      });
    }

    const dtoken = authHeader.split(' ')[1];
    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
    console.log('Decoded doctor Token:', decoded);

    req.body.docId = decoded.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export default authDoctor;



