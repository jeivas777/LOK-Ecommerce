const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Obter token do cabeçalho
      token = req.headers.authorization.split(" ")[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Anexar usuário à requisição (sem a senha)
      req.user = await User.findById(decoded.id);

      if (!req.user) {
        return res
          .status(401)
          .json({
            message: "Não autorizado, token falhou (usuário não encontrado).",
          });
      }

      next(); // Continuar para a próxima função middleware/rota
    } catch (error) {
      console.error("Erro na verificação do token:", error);
      res.status(401).json({ message: "Não autorizado, token falhou." });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Não autorizado, nenhum token." });
  }
};

module.exports = { protect };
