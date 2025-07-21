const Endereco = require("../models/Endereco");

const cadastrarEndereco = async (req, res) => {
  const { user_id, cep, uf, cidade, rua, complemento, numero } = req.body;

  try {
    const endereco = await Endereco.create({
      user_id,
      cep,
      uf,
      cidade,
      rua,
      complemento,
      numero,
    });

    res.status(201).json({
      message: "Endereco registrado com sucesso!",
      endereco,
    });
  } catch (error) {
    console.error("Erro no cadastro de endereco:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const buscarPorUserId = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ message: "ID do usuário é obrigatório." });
  }

  try {
    const enderecos = await Endereco.findByUserId(userId);

    if (enderecos.length === 0) {
      return res.status(404).json({ message: "Nenhum endereço encontrado." });
    }

    res.status(200).json(enderecos);
  } catch (error) {
    console.error("Erro ao buscar endereços:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// const setarEnderecoPadrao = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const endereco = await Endereco.setDefault(id);
//     res.status.json({
//       message: "Endereço padrão definido com sucesso!",
//       endereco,
//     });
//   } catch (error) {
//     console.error("Erro ao definir endereço padrão:", error);
//     return res.status(500).json({ message: "Erro interno do servidor." });
//   }
// };

const editarEndereco = async (req, res) => {
  const id = req.params.id;
  const { cep, uf, cidade, rua, complemento, numero } = req.body;

  try {
    const endereco = await Endereco.update(id, {
      cep,
      uf,
      cidade,
      rua,
      complemento,
      numero,
    });
    res.status(200).json({
      message: "Endereço editado com sucesso!",
      endereco,
    });
  } catch (error) {
    console.error("Erro ao editar endereço:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const excluirEndereco = async (req, res) => {
  const id = req.params.id;

  try {
    const endereco = await Endereco.delete(id);
    if (!endereco) {
      return res.status(404).json({ message: "Endereço não encontrado." });
    }
    res.status(200).json({ message: "Endereço excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir endereço:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = {
  cadastrarEndereco,
  buscarPorUserId,
  editarEndereco,
  excluirEndereco,
  // setarEnderecoPadrao,
};
