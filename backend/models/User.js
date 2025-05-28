// backend/models/User.js
const db = require("../config/db"); // Caminho do db.js é "../src/config/db" (ajuste se a pasta "src" não existir)

class User {
  // No método create, agora recebemos 'nome', 'cpf', 'email' e o 'hashedPassword' (que será salvo em 'senha')
  static async create({ nome, cpf, email, hashedPassword }) {
    const result = await db.query(
      "INSERT INTO lokecommerce.users (nome, cpf, email, senha) VALUES ($1, $2, $3, $4) RETURNING id, nome, cpf, email",
      [nome, cpf, email, hashedPassword] // Os parâmetros devem corresponder à ordem das colunas no INSERT
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    // ATENÇÃO: Adicionado 'lokecommerce.users' aqui
    const result = await db.query(
      "SELECT * FROM lokecommerce.users WHERE email = $1",
      [email]
    );
    return result.rows[0];
  }

  // Se você quiser buscar por CPF também, adicione um método:
  static async findByCpf(cpf) {
    // ATENÇÃO: Já estava correto com 'lokecommerce.users'
    const result = await db.query(
      "SELECT * FROM lokecommerce.users WHERE cpf = $1",
      [cpf]
    );
    return result.rows[0];
  }

  // O método findById seleciona as novas colunas que você pode querer expor
  static async findById(id) {
    // ATENÇÃO: Adicionado 'lokecommerce.users' aqui
    const result = await db.query(
      "SELECT id, nome, cpf, email FROM lokecommerce.users WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }
}

module.exports = User;
