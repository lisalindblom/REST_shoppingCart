const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    default: 0,
  },
  cartProducts: [
    {
      productId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product",
      },
      name: {
        type: String,
        required: true,
        minLenght: 2,
      },
      price: {
        type: Number,
        required: true,
      },
      numberOfProduct: {
        type: Number,
        default: 1,
      },
    },
  ],
  // cartProducts: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: "Products",
  //   default: [{}],
  // },
  // cartProducts: [mongoose.Schema.Types.ObjectId],
});
module.exports = mongoose.model("Cart", CartSchema);
