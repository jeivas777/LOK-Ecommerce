require("dotenv").config();
const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

// Conexão com PostgreSQL via URL única
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

pool.on("error", (err) => {
  console.error("Erro inesperado no cliente ocioso do banco de dados", err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
