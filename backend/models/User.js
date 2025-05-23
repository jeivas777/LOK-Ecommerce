const db = require("../config/db");

class User {
  static async create({ username, email, hashedPassword }) {
    const result = await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, hashedPassword]
    );
    return result.rows[0];
  }

  static async findByUsername(username) {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await db.query(
      "SELECT id, username, email FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }
}

module.exports = User;
