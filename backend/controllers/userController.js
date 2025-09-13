const { findByUserId } = require("../models/Endereco");
const User = require("../models/User");

const getUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const editUser = async (req, res) => {
  const id = req.user.id;

  const { nome, cpf, email, telefone } = req.body;

  try {
    // existingUserByCpf = await User.findByCpf(cpf);
    // if (existingUserByCpf) {
    //   return res.status(400).json({ message: "CPF já está em uso." });
    // }

    // existingUserByEmail = await User.findByEmail(email);
    // if (existingUserByCpf) {
    //   return res.status(400).json({ message: "CPF já está em uso." });
    // }

    const updatedUser = await User.edit({ id, nome, cpf, email, telefone });

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res
      .status(200)
      .json({ message: "Usuário atualizado com sucesso.", user: updatedUser });
  } catch (error) {
    console.error("Erro ao editar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = {
  getUser,
  editUser,
};
