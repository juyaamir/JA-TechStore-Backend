import jwt from 'jsonwebtoken';


// Middleware to verify jwt token
export const verifyToken = (req, res, next) => {
    // Get token from header
    const token = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['Authorization'];

    if (!token) return res.status(403).json({ message: 'No token provided!' });

    // Verify token
    const actualToken = token.split(' ')[1];
    jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        req.user = decoded;
        next();
    });
};

