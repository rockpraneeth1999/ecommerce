const express = require("express");
const router = express.Router();
const controller = require("../controllers/cart.controller");
const auth = require("../middlewares/auth.middleware");

router.use(auth);
router.get("/", controller.getCart);
router.post("/", controller.addToCart);
router.put("/:cartId/:itemId", controller.updateCartItem);
router.delete("/:cartId/:itemId", controller.removeCartItem);

module.exports = router;
