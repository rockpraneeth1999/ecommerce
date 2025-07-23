const { User } = require("../models");

exports.findUserByEmail = async (email) =>
    await User.findOne({ where: { email } });

exports.findUserById = async (id) =>
    await User.findByPk(id);

exports.createUser = async (userData) =>
    await User.create(userData);
