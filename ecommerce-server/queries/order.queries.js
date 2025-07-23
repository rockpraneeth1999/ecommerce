const { Order, OrderItem, CartItem } = require("../models");

exports.createOrderWithItems = async (userId, totalAmount, cart) => {
    const products = cart.Products;
    const order = await Order.create({ UserId: userId, totalAmount });

    for (const product of products) {
        await OrderItem.create({
            OrderId: order.id,
            ProductId: product.id,
            quantity: product.CartItem.quantity,
            price: product.price
        });
    }

    // Clear cart after order
    await CartItem.destroy({ where: { CartId: cart.id } });

    return order;
};
