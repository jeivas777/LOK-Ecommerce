// backend/routes/productRoutes.js
const express = require("express");
const db = require("../config/db"); // <--- Importe o db aqui!

const router = express.Router();

router.get("/products", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    let query = `%${req.query.name}%`;
    let rows;
    let totalItems;

    // Condição de estoque para PostgreSQL (usando ->> para acessar valores como texto)
    const stockCondition = `
            (stockBySize->>'L'::text)::int > 0 OR
            (stockBySize->>'M'::text)::int > 0 OR
            (stockBySize->>'S'::text)::int > 0 OR
            (stockBySize->>'XL'::text)::int > 0
        `;

    if (req.query.name) {
      const productsQuery = `
                SELECT * FROM products
                WHERE name ILIKE $1 AND (${stockCondition})
                LIMIT $2 OFFSET $3
            `;

      const countQuery = `
                SELECT COUNT(*) AS totalItems FROM products
                WHERE name ILIKE $1 AND (${stockCondition})
            `;

      // Use db.query em vez de req.db.query
      const result = await db.query(productsQuery, [query, limit, offset]);
      const count = await db.query(countQuery, [query]);

      rows = result.rows;
      totalItems = parseInt(count.rows[0].totalitems);
    } else {
      const productsQuery = `
                SELECT * FROM products
                WHERE (${stockCondition})
                LIMIT $1 OFFSET $2
            `;

      const countQuery = `
                SELECT COUNT(*) AS totalItems FROM products
                WHERE (${stockCondition})
            `;

      // Use db.query em vez de req.db.query
      const result = await db.query(productsQuery, [limit, offset]);
      const count = await db.query(countQuery);

      rows = result.rows;
      totalItems = parseInt(count.rows[0].totalitems);
    }

    res.json({ products: rows, totalItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    // Use db.query em vez de req.db.query
    const result = await db.query(`SELECT * FROM products WHERE id = $1`, [
      req.params.id,
    ]);

    const [product] = result.rows;

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.json(product);
  } catch (err) {
    console.error("Erro ao buscar produto:", err);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

module.exports = router;
