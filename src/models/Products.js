const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLenght: 2,
  },

  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Products", ProductSchema);
