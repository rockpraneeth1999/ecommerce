const { errorResponse } = require('../utils/response');

module.exports = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return errorResponse(res, 'Forbidden', 403);
    }
    next();
};
