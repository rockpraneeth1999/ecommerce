const bcrypt = require("bcryptjs");
const { generateToken, verifyToken } = require("../config/jwt");
const {
    findUserByEmail,
    createUser,
    findUserById,
} = require("../queries/user.queries");
const { successResponse, errorResponse } = require("../utils/response");

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (await findUserByEmail(email))
            return errorResponse(res, "Email already registered", 400);

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser({
            name,
            email,
            password: hashedPassword,
            role: role || "customer",
        });

        return successResponse(
            res,
            "User registered",
            { id: user.id, name, email, role: user.role },
            201
        );
    } catch (err) {
        console.error(err);
        return errorResponse(res, "Server error");
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password)))
            return errorResponse(res, "Invalid credentials", 400);

        const token = generateToken({ id: user.id, role: user.role });
        const refreshToken = generateToken({ id: user.id }, "7d");

        user.refreshToken = refreshToken;
        await user.save();

        return successResponse(res, "Login success", {
            token,
            refreshToken,
            user: { id: user.id, email, role: user.role },
        });
    } catch (err) {
        console.error(err);
        return errorResponse(res, "Server error");
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return errorResponse(res, "Missing token", 400);

        const decoded = verifyToken(refreshToken);
        const user = await findUserById(decoded.id);

        if (!user || user.refreshToken !== refreshToken)
            return errorResponse(res, "Forbidden", 403);

        const token = generateToken({ id: user.id, role: user.role });
        return successResponse(res, "Token refreshed", { token });
    } catch (err) {
        return errorResponse(res, "Invalid token", 401);
    }
};
