const { Pool } = require("pg");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");

const app = express();

const pool = new Pool({
  host: process.env.DB_HOST, // Ex: dpg-xxxxxx
  user: process.env.DB_USER, // Ex: lok_postgresql_user
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // Ex: lok_postgresql
  port: parseInt(process.env.DB_PORT || "5432"),
  ssl: true, // Render exige SSL para conexões externas
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
