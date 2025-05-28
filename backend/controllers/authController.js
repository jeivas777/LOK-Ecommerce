// backend/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Importa o modelo de usuário
const db = require("../config/db"); // Importa a conexão com o banco de dados para queries diretas (como a de email)

const register = async (req, res) => {
  // Agora pegamos 'nome', 'cpf', 'email' e 'senha' do corpo da requisição
  const { nome, cpf, email, senha } = req.body;

  // Validar se todos os campos obrigatórios estão presentes
  if (!nome || !cpf || !email || !senha) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    // Verificar se o email já existe (usando db.query diretamente, como antes)
    const existingUserByEmail = await User.findByEmail(email);
    if (existingUserByEmail.rows.length > 0) {
      return res.status(409).json({ message: "Email já está em uso." });
    }

    // Verificar se o CPF já existe (novo método findByCpf)
    const existingUserByCpf = await User.findByCpf(cpf);
    if (existingUserByCpf) {
      return res.status(409).json({ message: "CPF já está em uso." });
    }

    // Hashing da senha (o nome da variável continua hashedSenha)
    const salt = await bcrypt.genSalt(10);
    const hashedSenha = await bcrypt.hash(senha, salt);

    // Criar novo usuário, passando os novos campos e o hashedSenha para a coluna 'senha'
    const newUser = await User.create({ nome, cpf, email, hashedSenha });

    // Gerar JWT: o payload agora usa 'nome' em vez de 'username'
    const token = jwt.sign(
      { id: newUser.id, nome: newUser.nome }, // Usar 'nome' no payload do JWT
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expira em 1 hora
    );

    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      user: {
        id: newUser.id,
        nome: newUser.nome, // Retornar 'nome'
        cpf: newUser.cpf, // Retornar 'cpf'
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
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "email e senha são obrigatórios." });
  }

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Credenciais inválidas." });
    }

    // Comparar a senha fornecida com o hash armazenado na coluna 'senha'
    const isMatch = await bcrypt.compare(senha, user.senha); // ATENÇÃO: user.senha (coluna do banco)
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciais inválidas." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email }, // Usar 'nome' no payload do JWT
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login realizado com sucesso!",
      user: {
        id: user.id,
        nome: user.nome, // Retornar 'nome'
        cpf: user.cpf, // Retornar 'cpf'
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
