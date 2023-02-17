const Cart = require("../../models/Carts");
const Product = require("../../models/Products");
const { NotFoundError, BadRequestError } = require("../../utils/errors");

exports.createCart = async (req, res) => {
  const totalPrice = req.body.totalPrice;
  const cartProducts = req.body.cartProducts;

  const newCart = await Cart.create({
    totalPrice: totalPrice,
    cartProducts: cartProducts,
  });

  return res
    .setHeader(
      "Location",
      `http://localhost:${process.env.PORT}/api/v1/carts/${newCart._id}`
    )
    .status(201)
    .json(newCart);
};

exports.getAllCarts = async (req, res) => {
  const carts = await Cart.find();
  return res.json({
    data: carts,
  });
};
exports.getCartById = async (req, res) => {
  const cartId = req.params.cartId;
  const cart = await Cart.findById(cartId);

  if (!cart) throw new NotFoundError("This cart does not exist");

  return res.json(cart);
};
exports.deleteCart = async (req, res) => {
  const cartId = req.params.cartId;
  const cartToDelete = await Cart.findById(cartId);
  if (!cartToDelete) throw new NotFoundError("Cart does not exist");
  await cartToDelete.delete();
  return res.sendStatus(204);
};
exports.addProductToCart = async (req, res) => {
  const cartId = req.params.cartId;
  const productId = req.body.id;

  const cartToUse = await Cart.findById(cartId);
  const productToAdd = await Product.findById(productId);

  if (!cartToUse) throw new NotFoundError("This cart does not exist");
  if (!productToAdd) throw new NotFoundError("This product does not exist");

  cartToUse.totalPrice = 0;
  if (cartToUse.cartProducts.length < 1) {
    cartToUse.cartProducts.push(productToAdd);
    await cartToUse.save();
  } else {
    for (let i = 0; i < cartToUse.cartProducts.length; i++) {
      if (cartToUse.cartProducts[i]._id != productId) {
        cartToUse.cartProducts.push(productToAdd);
        await cartToUse.save();
      }
      if (cartToUse.cartProducts[i]._id == productId) {
        cartToUse.cartProducts[i].numberOfProduct++;
        console.log(cartToUse.cartProducts[i].numberOfProduct);
        await cartToUse.save();

        for (
          let i = 0;
          i < cartToUse.cartProducts[i].numberOfProduct.length;
          i++
        ) {
          let priceOfProducts =
            cartToUse.cartProducts[i].price *
            cartToUse.cartProducts[i].numberOfProduct;
        }
      }
    }
  }

  // for (let i = 0; i < cartToUse.cartProducts.length; i++) {
  //   let totalPrice = +cartToUse.cartProducts[i].price;
  // }

  // cartToUse.totalPrice = priceOfProducts + totalPrice;

  for (let i = 0; i < cartToUse.cartProducts.length; i++) {
    cartToUse.totalPrice += cartToUse.cartProducts[i].price;
  }

  const updatedCart = await cartToUse.save();
  console.log(updatedCart);
  console.log("totalPris: ", cartToUse.totalPrice);
  return res.json(updatedCart);
};
