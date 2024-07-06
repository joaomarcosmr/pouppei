const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
	const payload = {
		id: user.id,
		email: user.email,
	};

	const options = {
		expiresIn: '7d',
	};

	return jwt.sign(payload, process.env.JWT_SECRET, options);
};

const verifyToken = (token) => {
	try {
		return jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		console.error('Token verification failed:', error);
		return null;
	}
};

module.exports = {
	generateToken,
	verifyToken
};
