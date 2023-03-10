const express = require("express");
const router = express.Router();

const {
  createCart,
  getAllCarts,
  getCartById,
  deleteCart,
  addProductToCart,
  removeProductFromCart,
} = require("../../controllers/api/cartControllers");

router.post("/", createCart);
router.get("/", getAllCarts);
router.get("/:cartId", getCartById);
router.delete("/:cartId", deleteCart);
router.post("/:cartId", addProductToCart);
router.put("/:cartId", removeProductFromCart);

module.exports = router;
