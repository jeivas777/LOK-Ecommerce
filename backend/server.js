require('dotenv').config();
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");

const app = express();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
};

let connection;

app.use(async (req, res, next) => {
  try {
    if (!connection) {
      connection = await mysql.createConnection(dbConfig);
      console.log("MySQL conectado com sucesso :)");
    }

    req.db = connection;
    next();
  } catch (err) {
    console.error("Erro ao conectar ao MySQL", err);
    res.status(500).json({ error: "Erro ao conectar ao MySQL" });
  }
});

app.use(cors({
  origin: ['http://localhost:4200', 'https://seu-front-no-vercel.vercel.app'], // ou '*'
}));
app.use(bodyParser.json());
app.use("/api", productRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando na porta", process.env.PORT || 3000);
});
