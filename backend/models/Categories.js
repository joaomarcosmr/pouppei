const pool = require('../database/db')

class Category {
	constructor(id, name, color, emoji, createdAt) {
		this.id = id;
		this.name = name;
		this.color = color;
		this.emoji = emoji;
		this.createdAt = createdAt;
	}

	static async getAllCategories() {
		try {
			const query = 'SELECT * FROM categories;';
			const result = pool.query(query);
			const rows = result.rows;
			if (!rows) {
				return null;
			}
			return new Categories(rows.id, rows.name, rows.color, rows.emoji, rows.createdAt);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getCategoryById(id) {
		try {
			const query = `SELECT * FROM categories
										 WHERE id = $1;`
			const values = [id]
			const result = pool.query(query, values)
			const row = result.rows[0]
			if (row) {
				return new Categories(row.id, row.name, row.color, row.emoji, row.createdAt)
			}
			return null
		} catch (error) {
			console.log(error)
			throw error;
		}
	}

	static async createCategory(name, color, emoji) {
		try {
			const query = `INSERT INTO categories (name, color, emoji)
										 VALUES($1, $2, $3)
										 RETURNING *;`
			const values = [name, color, emoji]
			const result = pool.query(query, values)
			const row = result.rows[0]
			return new Categories(row.id, row.name, row.color, row.emoji, row.createdAt)
		} catch (error) {
			console.log(error)
			throw error;
		}
	}

	static async updateCategory(id, name, color, emoji) {
		try {
			const query = `UPDATE categories
										 SET name = $1, color = $2, emoji = $3
										 WHERE id = $4
										 RETURNING *;`
			const values = [name, color, emoji, id]
			const result = pool.query(query, values)
			const row = result.rows[0]
			return new Categories(row.id, row.name, row.color, row.emoji, row.createdAt)
		} catch (error) {
			console.log(error)
			throw error;
		}
	}

	static async deleteCategory(id) {
		try {
			const query = `DELETE FROM categories
										 WHERE id = $1;`
			const values = [id]
			const result = pool.query(query, values)
			return result.rowCount > 0
		} catch (error) {
			console.log(error)
			throw error;
		}
	}
}

module.exports = Category;