const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    // Verificar se o usuário já existe
    const existingUserByUsername = await User.findByUsername(username);
    if (existingUserByUsername) {
      return res
        .status(409)
        .json({ message: "Nome de usuário já está em uso." });
    }
    const existingUserByEmail = await User.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUserByEmail.rows.length > 0) {
      return res.status(409).json({ message: "Email já está em uso." });
    }

    // Hashing da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Criar novo usuário
    const newUser = await User.create({ username, email, hashedPassword });

    // Gerar JWT
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expira em 1 hora
    );

    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Nome de usuário e senha são obrigatórios." });
  }

  try {
    // Encontrar usuário pelo nome de usuário
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(400).json({ message: "Credenciais inválidas." });
    }

    // Comparar senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciais inválidas." });
    }

    // Gerar JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login realizado com sucesso!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = {
  register,
  login,
};
