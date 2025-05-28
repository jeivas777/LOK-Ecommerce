// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes"); // Verifique o caminho
const productRoutes = require("./routes/productRoutes"); // Verifique o caminho
const db = require("./config/db"); // Importa o módulo db para que a conexão seja inicializada

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:59458",
      "http://localhost:4200",
      "https://lokecommerce.netlify.app",
    ],
  })
);

// Middleware para parsear JSON no corpo da requisição
app.use(bodyParser.json());

// Remova o middleware que injetava req.db = pool;
// app.use(async (req, res, next) => {
//   try {
//     req.db = pool;
//     next();
//   } catch (err) {
//     console.error("Erro ao conectar ao PostgreSQL", err);
//     res.status(500).json({ error: "Erro ao conectar ao PostgreSQL" });
//   }
// });

// Rotas de autenticação
app.use("/api/auth", authRoutes);
// Rotas de produtos
app.use("/api", productRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send("API de Autenticação e Produtos rodando!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando na porta", process.env.PORT || 3000);
});
