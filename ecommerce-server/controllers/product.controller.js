const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../queries/product.queries");
const { successResponse, errorResponse } = require("../utils/response");

exports.getProducts = async (req, res) => {
    try {
        return successResponse(res, "Products fetched", await getProducts(req.query));
    } catch (e) {
        console.error(e);
        return errorResponse(res, "Server error");
    }
};

exports.createProduct = async (req, res) => {
    try {
        return successResponse(res, "Product created", await createProduct(req.body), 201);
    } catch (e) {
        console.error(e);
        return errorResponse(res, "Server error");
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const p = await updateProduct(req.params.id, req.body);
        if (!p) return errorResponse(res, "Not found", 404);
        return successResponse(res, "Updated", p);
    } catch (e) {
        console.error(e);
        return errorResponse(res, "Server error");
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const d = await deleteProduct(req.params.id);
        if (!d) return errorResponse(res, "Not found", 404);
        return successResponse(res, "Deleted");
    } catch (e) {
        console.error(e);
        return errorResponse(res, "Server error");
    }
};
