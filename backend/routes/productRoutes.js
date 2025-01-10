const express = require("express");
const Product = require("../models/product");
const router = express.Router();

// Listar todos os produtos
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Buscar um produto específico
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

const newProduct = new Product({
  name: "Teste",
  description: "Teste",
  price: 12,
  image: "Teste",
  category: "Teste",
  stock: 2,
});

newProduct
  .save()
  .then(() => {
    console.log("Produto salvo com sucesso!");
  })
  .catch((err) => {
    console.log("Erro ao salvar o produto :(", err);
  });

module.exports = router;
