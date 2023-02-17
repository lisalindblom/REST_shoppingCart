const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  addProductToCart,
} = require("../../controllers/api/productControllers");

router.get("/:productId", getProductById);
router.get("/", getAllProducts);
// router.post("/:productId", addProductToCart);

module.exports = router;
