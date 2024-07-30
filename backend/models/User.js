const pool = require('../database/db')
const table = `users`

class User {
	constructor(id, name, email, password, telephone, birth_date, created_at, deleted_at) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.telephone = telephone;
		this.birth_date = birth_date;
		this.created_at = created_at;
		this.deleted_at = deleted_at;
	}

	static async getAllUsers() {
		try {
			const query = `SELECT * FROM ${table} WHERE deleted_at IS NULL;`;
			const result = await pool.query(query);
			return result.rows.map(row => new User(row.id, row.name, row.email, row.password, row.telephone, row.birth_date, row.createdAt));
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getUserById(id) {
		try {
			const query = `SELECT * FROM ${table}
										 WHERE id = $1
										 AND deleted_at IS NULL;`
			const values = [id]
			const result = await pool.query(query, values)
			const row = result.rows[0]
			if (row) {
				return new User(row.id, row.name, row.email, row.password, row.telephone, row.birth_date, row.createdAt)
			}
			return null
		} catch (error) {
			console.log(error)
			throw error;
		}
	}

	static async findUserByEmail(email) {
		try {
			const query = `SELECT * FROM ${table}
										 WHERE email = $1
										 AND deleted_at IS NULL;`
			const values = [email]
			const result = await pool.query(query, values)
			const row = result.rows[0]
			if (row) {
				return new User(row.id, row.name, row.email, row.password, row.telephone, row.birth_date, row.createdAt)
			}
			return null
		} catch (error) {
			console.log(error)
			throw error;
		}
	}

	static async createUser(name, email, password, telephone, birth_date) {
		try {
			const query = `INSERT INTO ${table} (name, email, password, telephone, birth_date)
										 VALUES($1, $2, $3, $4, $5)
										 RETURNING *;`
			const values = [name, email, password, telephone, birth_date]
			const result = await pool.query(query, values)
			const row = result.rows[0]
			return new User(row.id, row.name, row.email, row.password, row.telephone, row.birth_date, row.createdAt)
		} catch (error) {
			console.log(error)
			throw error;
		}
	}

	static async updateUser(id, name, email, password, telephone, birth_date) {
		try {
			const query = `UPDATE ${table}
										 SET name = $2,
										 		 email = $3,
												 password = $4,
												 telephone = $5,
												 birth_date = $6
										 WHERE id = $1
										 AND deleted_at IS NULL
										 RETURNING *;`
			const values = [id, name, email, password, telephone, birth_date]
			const results = await pool.query(query, values)
			const row = results.rows[0]
			return new User(row.id, row.name, row.email, row.password, row.telephone, row.birth_date, row.createdAt)
		} catch (error) {
			console.log(error)
			throw error;
		}
	}

	static async deleteUser(id) {
		try {
			const query = `UPDATE ${table}
										 SET deleted_at = NOW()
										 WHERE id = $1
										 AND deleted_at IS NULL
										 RETURNING *;`
			const values = [id]
			const result = pool.query(query, values)
			const row = result.rows[0]
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