const express = require("express");
const endereco = require("../controllers/enderecoController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/cadastrar", protect, endereco.cadastrarEndereco);
router.get("/buscar/:userId", protect, endereco.buscarPorUserId);
// router.put("/default/:id", endereco.setarEnderecoPadrao);
router.put("/editar/:id", protect, endereco.editarEndereco);
router.delete("/excluir/:id", protect, endereco.excluirEndereco);

module.exports = router;
