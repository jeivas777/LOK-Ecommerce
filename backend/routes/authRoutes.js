const express = require("express");
const { register, login } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Exemplo de rota protegida
router.get("/profile", protect, async (req, res) => {
  // req.user estará disponível aqui devido ao middleware 'protect'
  res.json({
    message: "Acesso ao perfil concedido!",
    user: req.user,
  });
});

module.exports = router;
