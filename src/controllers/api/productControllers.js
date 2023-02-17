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
// exports.addProductToCart = async (req, res) => {
//   const productId = req.params.productId;
//   console.log(productId);

//   const cartId = req.body.id;
//   console.log(cartId);

//   const cartToUse = await Cart.findById(cartId);
//   const productToAdd = await Products.findById(productId);

//   if (!cartToUse) throw new NotFoundError("This cart does not exist");
//   if (!productToAdd) throw new NotFoundError("This product does not exist");
//   console.log(cartToUse);

//   cartToUse.totalPrice = 0;
//   console.log(cartToUse.cartProducts[i].price);

//   cartToUse.cartProducts.push(productToAdd);

//   for (let i = 0; i < cartToUse.cartProducts.length; i++) {
//     cartToUse.totalPrice += cartToUse.cartProducts[i].price;
//   }
// };
