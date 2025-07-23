const {
    findOrCreateCart,
    findCartWithProducts,
    findOrCreateCartItem,
    updateCartItemQuantity,
    deleteCartItem,
} = require("../queries/cart.queries");
const { successResponse, errorResponse } = require("../utils/response");

exports.getCart = async (req, res) => {
    try {
        return successResponse(
            res,
            "Cart fetched",
            (await findCartWithProducts(req.user.id)) || []
        );
    } catch (e) {
        console.error(e);
        return errorResponse(res, "Server error");
    }
};

exports.addToCart = async (req, res) => {
    try {
        const cart = await findOrCreateCart(req.user.id);
        return successResponse(
            res,
            "Added",
            await findOrCreateCartItem(cart.id, req.body.productId, req.body.quantity)
        );
    } catch (e) {
        console.error(e);
        return errorResponse(res, "Server error");
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const item = await updateCartItemQuantity(
            req.params.cartId,
            req.params.itemId,
            req.body.quantity
        );
        if (!item) return errorResponse(res, "Not found", 404);
        return successResponse(res, "Updated", item);
    } catch (e) {
        console.error(e);
        return errorResponse(res, "Server error");
    }
};

exports.removeCartItem = async (req, res) => {
    try {
        const removed = await deleteCartItem(req.params.cartId, req.params.itemId);
        if (!removed) return errorResponse(res, "Not found", 404);
        return successResponse(res, "Removed");
    } catch (e) {
        console.error(e);
        return errorResponse(res, "Server error");
    }
};
