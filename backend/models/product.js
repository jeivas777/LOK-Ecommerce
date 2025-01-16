const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  stockBySize: {},
  images: [String],
});

module.exports = mongoose.model("Product", productSchema);
