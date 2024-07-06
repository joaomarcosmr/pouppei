const pool = require('../database/db')

class User {
	constructor(id, username, email, createdAt) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.createdAt = createdAt;
	}

	static async getAllUsers() {
		try {
			const query = 'SELECT * FROM users';
			const result = await pool.query(query);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getUserByIs(id) {
		try {
			const query = `SELECT * FROM users
										 WHERE id = $1`
			const values = [id]
			const result = await pool.query(query, values)
			console.log(result.rows)
		} catch (error) {
			console.log(error)
			throw error;
		}
	}
}


User.getUserByIs(1)