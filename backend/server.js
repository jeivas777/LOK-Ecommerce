const { Pool } = require("pg");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Conexão com PostgreSQL via URL única
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // necessário para conexão externa com Render
  },
});

app.use(async (req, res, next) => {
  try {
    req.db = pool;
    next();
  } catch (err) {
    console.error("Erro ao conectar ao PostgreSQL", err);
    res.status(500).json({ error: "Erro ao conectar ao PostgreSQL" });
  }
});

app.use(
  cors({
    origin: ["http://localhost:4200", "https://seu-front-no-vercel.vercel.app"],
  })
);
app.use(bodyParser.json());
app.use("/api", productRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando na porta", process.env.PORT || 3000);
});
