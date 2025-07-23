import API from "./axios";

export const fetchCart = async () => {
    const { data } = await API.get("/cart");
    return data.data; // [{ id, productId, quantity, Product: { name, price, ... } }]
};

export const addToCart = async (productId, quantity = 1) => {
    return await API.post("/cart", { productId, quantity });
};

export const updateCartItem = async (itemId, quantity, cartId) => {
    return await API.put(`/cart/${cartId}/${itemId}`, { quantity });
};

export const removeCartItem = async (cartId, itemId) => {
    return await API.delete(`/cart/${cartId}/${itemId}`);
};
