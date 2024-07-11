const pool = require('../database/db')

class User {
	constructor(id, username, email, password, created_at, deleted_at) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.created_at = created_at;
		this.deleted_at = deleted_at;
	}

	static async getAllUsers() {
		try {
			const query = 'SELECT * FROM users WHERE deleted_at IS NULL;';
			const result = await pool.query(query);
			return result.rows.map(row => new User(row.id, row.username, row.email, row.password, row.createdAt));
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getUserById(id) {
		try {
			const query = `SELECT * FROM users
										 WHERE id = $1
										 AND deleted_at IS NULL;`
			const values = [id]
			const result = await pool.query(query, values)
			const row = result.rows[0]
			if (row) {
				return new User(row.id, row.email, row.createdAt)
			}
			return null
		} catch (error) {
			console.log(error)
			throw error;
		}
	}

	static async findUserByEmail(email) {
		try {
			const query = `SELECT * FROM users
										 WHERE email = $1
										 AND deleted_at IS NULL;`
			const values = [email]
			const result = await pool.query(query, values)
			const row = result.rows[0]
			if (row) {
				return new User(row.id, row.username, row.email, row.password, row.created_at)
			}
			return null
		} catch (error) {
			console.log(error)
			throw error;
		}
	}

	static async createUser(username, email, password) {
		try {
			const query = `INSERT INTO users (username, email, password)
										 VALUES($1, $2, $3)
										 RETURNING *;`
			const values = [username, email, password]
			const result = await pool.query(query, values)
			const row = result.rows[0]
			return new User(row.id, row.username, row.email, row.password, row.created_at)
		} catch (error) {
			console.log(error)
			throw error;
		}
	}

	static async updateUser(id, username, email, password) {
		try {
			const query = `UPDATE users
										 SET username = $2,
										 		 email = $3,
												 password = $4
										 WHERE id = $1
										 AND deleted_at IS NULL
										 RETURNING *;`
			const values = [id, username, email, password]
			const results = await pool.query(query, values)
			const row = results.rows[0]
			return new User(row.id, row.username, row.email, row.password, row.created_at)
		} catch (error) {
			console.log(error)
			throw error;
		}
	}

	static async deleteUser(id) {
		try {
			const query = `UPDATE users
										 SET deleted_at = NOW()
										 WHERE id = $1
										 AND deleted_at IS NULL
										 RETURNING *;`
			const values = [id]
			const result = pool.query(query, values)
			if (row) {
				return row
			}
			return null;
		} catch (error) {
			console.log(error)
			throw error;
		}
	}
}

module.exports = User;