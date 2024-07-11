const pool = require('../database/db')

class Category {
	constructor(id, user_id, name, color, emoji, created_at, deleted_at) {
		this.id = id;
		this.user_id = user_id;
		this.name = name;
		this.color = color;
		this.emoji = emoji;
		this.created_at = created_at;
		this.deleted_at = deleted_at;
	}

	static async getAllCategories(user_id) {
		try {
			const query = `SELECT * FROM categories
										 WHERE user_id = $1
										 AND deleted_at IS NULL;`;
			const values = [user_id]
			const result = await pool.query(query, values);
			const rows = result.rows;
			if (!rows) {
				return null;
			}
			return rows.map(row => new Category(row.id, row.user_id, row.name, row.color, row.emoji, row.created_at));
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getCategoryById(id, user_id) {
		try {
			const query = `SELECT * FROM categories
										 WHERE id = $1
										 AND user_id = $2
										 AND deleted_at IS NULL;`
			const values = [id, user_id]
			const result = await pool.query(query, values)
			const row = result.rows[0]
			if (row) {
				return new Category(row.id, row.user_id, row.name, row.color, row.emoji, row.created_at)
			}
			return null
		} catch (error) {
			console.log(error)
			throw error;
		}
	}

	static async createCategory(user_id, name, color, emoji) {
		try {
			const query = `INSERT INTO categories (user_id, name, color, emoji)
										 VALUES($1, $2, $3, $4)
										 RETURNING *;`
			const values = [user_id, name, color, emoji]
			const result = await pool.query(query, values)
			const row = result.rows[0]
			return new Category(row.id, row.user_id, row.name, row.color, row.emoji, row.created_at)
		} catch (error) {
			console.log(error)
			throw error;
		}
	}

	static async updateCategory(id, user_id, name, color, emoji) {
		try {
			const query = `UPDATE categories
										 SET name = $1, color = $2, emoji = $3
										 WHERE id = $4 
										 AND user_id = $5
										 AND deleted_at IS NULL
										 RETURNING *;`
			const values = [name, color, emoji, id, user_id]
			const result = await pool.query(query, values)
			if (result.rowCount === 0) {
				return null
			}
			const row = result.rows[0]
			return new Category(row.id, row.user_id, row.name, row.color, row.emoji, row.created_at)
		} catch (error) {
			console.log(error)
			throw error;
		}
	}

	static async deleteCategory(id, user_id) {
		try {
			const query = `UPDATE categories
										 SET deleted_at = NOW()
										 WHERE id = $1 
										 AND user_id = $2
										 AND deleted_at IS NULL
										 RETURNING *;`
			const values = [id, user_id]
			const result = await pool.query(query, values)
			const row = result.rows[0];
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

module.exports = Category;