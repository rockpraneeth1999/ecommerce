const { Cart, CartItem, Product } = require("../models");

exports.findOrCreateCart = async (userId) => {
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) cart = await Cart.create({ UserId: userId });
    return cart.dataValues;
};

exports.findCartWithProducts = async (userId) =>
    await Cart.findOne({ where: { userId }, include: [Product] });

exports.findOrCreateCartItem = async (cartId, productId, quantity) => {
    const [item, created] = await CartItem.findOrCreate({
        where: { CartId: cartId, ProductId: productId },
        defaults: { quantity }
    });

    if (!created) {
        item.quantity += quantity;
        await item.save();
    }
    return item;
};

exports.updateCartItemQuantity = async (cartId, itemId, quantity) => {
    const item = await CartItem.findOne({
        where: {
            CartId: cartId,
            ProductId: itemId,
        },
    });
    if (!item) return null;
    item.quantity = quantity;
    await item.save();
    return item;
};

exports.deleteCartItem = async (cartId, itemId) => {
    const item = await CartItem.findOne({
        where: {
            CartId: cartId,
            ProductId: itemId,
        },
    });
    if (!item) return null;
    await item.destroy();
    return item;
};
