const express = require("express");
const mysql2 = require("mysql2/promise");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = 5000;

const dbConfig = {
  host: "127.0.0.1",
  user: "root",
  password: "27022005",
  database: "ecommerce",
  port: 3306,
};

let connection;

app.use(async (req, res, next) => {
  try {
    if (!connection) {
      connection = await mysql2.createConnection(dbConfig);
      console.log("MySQL conectado com sucesso :)");
    }

    req.db = connection;
    next();
  } catch (err) {
    console.error("Erro ao conectar ao MySQL", err);
    res.status(500).json({ error: "Erro ao conectar ao MySQL" });
  }
});

app.use(cors());
app.use(bodyParser.json());
app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
