const { findCartWithProducts } = require("../queries/cart.queries");
const { createOrderWithItems } = require("../queries/order.queries");
const { successResponse, errorResponse } = require("../utils/response");

exports.createOrder = async (req, res) => {
    try {
        const cart = await findCartWithProducts(req.user.id);
        if (!cart || !cart.Products.length)
            return errorResponse(res, "Cart empty", 400);

        const total = cart.Products.reduce(
            (s, p) => s + p.CartItem.quantity * p.price,
            0
        );

        const order = await createOrderWithItems(
            req.user.id,
            total,
            cart
        );

        return successResponse(res, "Order placed", { orderId: order.id }, 201);
    } catch (e) {
        console.error(e);
        return errorResponse(res, "Server error");
    }
};
