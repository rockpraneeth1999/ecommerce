import API from "./axios";

// Fetch products with optional search & pagination
export const fetchProducts = async (search = "", page = 1, limit = 10) => {
    const { data } = await API.get(
        `/products?search=${search}&page=${page}&limit=${limit}`
    );
    return data.data; // { rows: [...], count: totalProducts }
};

// Create a new product
export const createProduct = async (productData) => {
    return await API.post("/products", productData);
};

// Update product
export const updateProduct = async (id, productData) => {
    return await API.put(`/products/${id}`, productData);
};

// Delete product
export const deleteProduct = async (id) => {
    return await API.delete(`/products/${id}`);
};