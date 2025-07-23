const { Product } = require("../models");
const { Op } = require("sequelize");

exports.getProducts = async ({ search, page = 1, limit = 10 }) => {
    const where = search ? { name: { [Op.like]: `%${search}%` } } : {};
    const offset = (page - 1) * limit;

    const { rows, count } = await Product.findAndCountAll({
        where,
        offset,
        limit: +limit
    });

    return {
        products: rows,
        total: count,
        page: +page,
        pages: Math.ceil(count / limit)
    };
};

exports.createProduct = async (data) =>
    await Product.create(data);

exports.updateProduct = async (id, updates) => {
    const product = await Product.findByPk(id);
    if (!product) return null;
    await product.update(updates);
    return product;
};

exports.deleteProduct = async (id) => {
    const product = await Product.findByPk(id);
    if (!product) return null;
    await product.destroy();
    return product;
};
