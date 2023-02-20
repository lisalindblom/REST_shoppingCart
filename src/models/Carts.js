const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    default: 0,
  },
  cartProducts: [
    {
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
});
module.exports = mongoose.model("Cart", CartSchema);
