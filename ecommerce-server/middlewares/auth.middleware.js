const { verifyToken } = require('../config/jwt');
const { errorResponse } = require('../utils/response');

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return errorResponse(res, 'No token provided', 401);

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch {
        return errorResponse(res, 'Unauthorized', 401);
    }
};
