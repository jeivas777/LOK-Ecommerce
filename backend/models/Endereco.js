// backend/models/User.js
const db = require("../config/db"); // Caminho do db.js é "../src/config/db" (ajuste se a pasta "src" não existir)

class Endereco {
  static async create({ user_id, cep, uf, cidade, rua, complemento, numero }) {
    const result = await db.query(
      "INSERT INTO enderecos (user_id, cep, uf, cidade, rua, complemento, numero) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, user_id, cep, uf, cidade, rua, complemento, numero",
      [user_id, cep, uf, cidade, rua, complemento, numero]
    );
    return result.rows[0];
  }

  static async findByUserId(user_id) {
    const result = await db.query(
      "SELECT * FROM enderecos WHERE user_id = $1",
      [user_id]
    );
    return result.rows;
  }

  // static async setDefault(id, user_id) {
  //   const result = await db.query(
  //     "UPDATE enderecos SET is_default = CASE WHEN id = $2 THEN true ELSE false END WHERE user_id = $1 RETURNING *",
  //     [id, user_id]
  //   );
  //   return result.rows[0];
  // }

  static async update(id, novoEndereco) {
    const { cep, uf, cidade, rua, complemento, numero } = novoEndereco;

    const result = await db.query(
      "UPDATE enderecos SET cep = $1, uf = $2, cidade = $3, rua = $4, complemento = $5, numero = $6 WHERE id = $7 RETURNING *",
      [cep, uf, cidade, rua, complemento, numero, id]
    );

    if (result.rows.length === 0) {
      throw new Error("Endereço não encontrado.");
    }

    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query(
      "DELETE FROM enderecos WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      throw new Error("Endereço não encontrado.");
    }

    return result.rows[0];
  }
}

module.exports = Endereco;
