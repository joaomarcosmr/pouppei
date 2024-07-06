const { verifyToken } = require('../utils/auth');

const authGuard = (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1]; // Bearer token

	if (!token) {
		return res.status(401).json({ message: 'Access denied. No token provided.' });
	}

	const decoded = verifyToken(token);

	if (!decoded) {
		return res.status(401).json({ message: 'Invalid token.' });
	}

	req.user = decoded;
	next();
};

module.exports = authGuard;
