const express = require("express");
const Product = require("../models/product");
const router = express.Router();

// Listar todos os produtos
router.get("/products", async (req, res) => {
  try {
    let query = {};

    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: "i" };
    }

    const product = await Product.find(query);

    res.json(product);
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

// Adicionar um produto
router.post("/products", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    category: req.body.category,
    stock: req.body.stock,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deletar produto
router.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Produto deletado com sucesso" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Deletar todos os produtos
router.delete("/products", async (req, res) => {
  try {
    await Product.deleteMany();
    res.json({ message: "Todos os produtos foram deletados" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
