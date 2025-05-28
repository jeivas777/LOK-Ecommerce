require("dotenv").config();
const { Pool } = require("pg");

// Conexão com PostgreSQL via URL única
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // necessário para conexão externa com Render
  },
});

pool.on("error", (err) => {
  console.error("Erro inesperado no cliente ocioso do banco de dados", err);
  process.exit(-1); // Encerrar o processo em caso de erro grave
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
