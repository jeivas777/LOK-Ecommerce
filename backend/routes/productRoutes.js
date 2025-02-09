const express = require("express");
const Product = require("../models/product");
const router = express.Router();

// Listar todos os produtos
router.get("/products", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    let query = `%${req.query.name}%`;
    let rows;
    let totalItems;

    if (req.query.name) {
      [rows] = await req.db.query(
        "SELECT * FROM products WHERE name LIKE ? LIMIT ? OFFSET ?",
        [query, limit, offset]
      );

      [[totalItems]] = await req.db.query(
        "SELECT COUNT(*) AS totalItems FROM products WHERE name LIKE ?",
        [query]
      );
    } else {
      [rows] = await req.db.query("SELECT * FROM products LIMIT ? OFFSET ?", [
        limit,
        offset,
      ]);
      [[totalItems]] = await req.db.query(
        "SELECT COUNT(*) AS totalItems FROM products",
        [query]
      );
    }

    res.json({ products: rows, totalItems: totalItems.totalItems });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Buscar um produto específico
router.get("/products/:id", async (req, res) => {
  try {
    const [[rows]] = await req.db.query(
      "SELECT * FROM products WHERE ID = ?",
      req.params.id
    );
    res.json(rows);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
