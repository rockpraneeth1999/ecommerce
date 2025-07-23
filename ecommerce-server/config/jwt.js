const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken = (payload, expiresIn = '1h') =>
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

exports.verifyToken = (token) =>
    jwt.verify(token, process.env.JWT_SECRET);
