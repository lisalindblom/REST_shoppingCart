const express = require("express");
const router = express.Router();

const cartRoutes = require("./cartRoutes");
const productRoutes = require("./productRoutes");

router.use("/carts", cartRoutes);
router.use("/products", productRoutes);

module.exports = router;
