const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
} = require("../../controllers/api/productControllers");

router.get("/:productId", getProductById);
router.get("/", getAllProducts);

module.exports = router;
