// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes"); // Verifique o caminho
const productRoutes = require("./routes/productRoutes"); // Verifique o caminho
const enderecoRoutes = require("./routes/enderecoRoutes"); // Verifique o caminho
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

app.use(bodyParser.json());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);
app.use("/api/endereco", enderecoRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send("API de Autenticação e Produtos rodando!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando na porta", process.env.PORT || 3000);
});
