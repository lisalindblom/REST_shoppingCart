const express = require("express");
const router = express.Router();

const {
  createCart,
  getAllCarts,
  getCartById,
  deleteCart,
  addProductToCart,
} = require("../../controllers/api/cartControllers");

router.post("/", createCart);
router.get("/", getAllCarts);
router.get("/:cartId", getCartById);
router.delete("/:cartId", deleteCart);
router.post("/:cartId", addProductToCart);

module.exports = router;
