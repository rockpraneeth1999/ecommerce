const Sequelize = require("sequelize");
const sequelize = require("./sequelize");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, Sequelize);
db.Product = require("./product.model")(sequelize, Sequelize);
db.Cart = require("./cart.model")(sequelize, Sequelize);
db.CartItem = require("./cartItem.model")(sequelize, Sequelize);
db.Order = require("./order.model")(sequelize, Sequelize);
db.OrderItem = require("./orderItem.model")(sequelize, Sequelize);

// ====================
// ✅ Associations
// ====================
db.User.hasMany(db.Cart);
db.Cart.belongsTo(db.User);

db.User.hasMany(db.Order);
db.Order.belongsTo(db.User);

db.Cart.belongsToMany(db.Product, { through: db.CartItem });
db.Product.belongsToMany(db.Cart, { through: db.CartItem });

db.Order.belongsToMany(db.Product, { through: db.OrderItem });
db.Product.belongsToMany(db.Order, { through: db.OrderItem });

// ====================
// ✅ Admin Seeding Logic
// ====================
async function createAdmin() {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminName = process.env.ADMIN_NAME || "Admin";
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            console.warn("⚠️ Admin credentials not set in .env, skipping admin creation.");
            return;
        }

        const existing = await db.User.findOne({ where: { email: adminEmail } });

        if (!existing) {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            await db.User.create({
                name: adminName,
                email: adminEmail,
                password: hashedPassword,
                role: "admin",
            });
            console.log(`✅ Admin user created: ${adminEmail} / ${adminPassword}`);
        } else {
            console.log("✅ Admin already exists");
        }
    } catch (err) {
        console.error("❌ Error creating admin:", err);
    }
}

// Run admin seeding after syncing DB
db.sequelize.sync({ alter: false }).then(() => {
    createAdmin();
});

module.exports = db;
