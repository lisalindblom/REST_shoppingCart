const Products = require("../../models/Products");
const Cart = require("../../models/Carts");
const { NotFoundError } = require("../../utils/errors");

exports.getAllProducts = async (req, res) => {
  const limit = Number(req.query?.limit || 8);
  const products = await Products.find().limit(limit);
  const totalProducts = await Products.countDocuments();

  return res.json({
    data: products,
    meta: {
      total: totalProducts,
      limit: limit,
      count: products.lenght,
    },
  });
};
exports.getProductById = async (req, res) => {
  const productId = req.params.productId;
  const product = await Products.findById(productId);
  if (!product)
    throw new NotFoundError("A product with this id does not exist");

  return res.json(product);
};
