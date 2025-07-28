// backend/models/User.js
const db = require("../config/db");

class User {
  static async create({ nome, cpf, email, hashedSenha, telefone }) {
    const result = await db.query(
      "INSERT INTO users (nome, cpf, email, senha, telefone) VALUES ($1, $2, $3, $4, $5) RETURNING id, nome, cpf, email, telefone",
      [nome, cpf, email, hashedSenha, telefone]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  }

  static async findByCpf(cpf) {
    const result = await db.query("SELECT * FROM users WHERE cpf = $1", [cpf]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await db.query(
      "SELECT id, nome, cpf, email FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }
}

module.exports = User;
