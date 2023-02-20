const Cart = require("../../models/Carts");
const Product = require("../../models/Products");
const { NotFoundError } = require("../../utils/errors");

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
  if (!cartToDelete) throw new NotFoundError("This cart does not exist");
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

  let productIsNew = true;

  for (let i = 0; i < cartToUse.cartProducts.length; i++) {
    if (cartToUse.cartProducts[i]._id == productId) {
      cartToUse.cartProducts[i].numberOfProduct++;
      await cartToUse.save();
      productIsNew = false;
    }
  }
  if (productIsNew) {
    cartToUse.cartProducts.push(productToAdd);
    cartToUse.totalPrice = productToAdd.price;
    await cartToUse.save();
  }

  cartToUse.totalPrice = 0;
  for (let i = 0; i < cartToUse.cartProducts.length; i++) {
    cartToUse.totalPrice +=
      cartToUse.cartProducts[i].price *
      cartToUse.cartProducts[i].numberOfProduct;
  }
  await cartToUse.save();

  /********************** Måste stå sist *****************************/
  if (cartToUse.cartProducts.length < 1) {
    cartToUse.cartProducts.push(productToAdd);
    cartToUse.totalPrice = productToAdd.price;
    await cartToUse.save();
  }

  const updatedCart = await cartToUse.save();

  return res.json(updatedCart);
};
exports.removeProductFromCart = async (req, res) => {
  const cartId = req.params.cartId;
  const productId = req.body.id;

  const cartToUse = await Cart.findById(cartId);
  if (!cartToUse) throw new NotFoundError("This cart does not exist");

  for (let i = 0; i < cartToUse.cartProducts.length; i++) {
    if (cartToUse.cartProducts[i]._id == productId) {
      cartToUse.cartProducts[i].numberOfProduct -= 1;
      await cartToUse.save();

      if (cartToUse.cartProducts[i].numberOfProduct < 1) {
        cartToUse.cartProducts.splice([i], 1);
        await cartToUse.save();
      }
    }
  }

  if (cartToUse.cartProducts.length < 1) {
    cartToUse.totalPrice = 0;
    await cartToUse.save();
    throw new NotFoundError("This cart is empty");
  }
  cartToUse.totalPrice = 0;
  for (let i = 0; i < cartToUse.cartProducts.length; i++) {
    cartToUse.totalPrice +=
      cartToUse.cartProducts[i].price *
      cartToUse.cartProducts[i].numberOfProduct;
  }
  await cartToUse.save();

  const updatedCart = await cartToUse.save();

  return res.json(updatedCart);
};
