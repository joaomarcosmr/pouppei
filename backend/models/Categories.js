const pool = require('../database/db')
const table = `categories`

class Category {
	constructor(id, user_id, name, color, bank_account_id, credit_card_id, created_at) {
		this.id = id;
		this.user_id = user_id;
		this.name = name;
		this.color = color;
		this.bank_account_id = bank_account_id;
		this.credit_card_id = credit_card_id;
		this.created_at = created_at;
	}

	static async getAllCategories(user_id) {
		try {
			const query = `SELECT * FROM ${table}
										 WHERE user_id = $1
										 AND deleted_at IS NULL;`;
			const values = [user_id]
			const result = await pool.query(query, values);
			const rows = result.rows;
			if (!rows) {
				return null;
			}
			return rows.map(row => new Category(row.id, row.user_id, row.name, row.color, row.bank_account_id, row.credit_card_id, row.created_at));
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getCategoryById(id, user_id) {
		try {
			const query = `SELECT * FROM ${table}
										 WHERE id = $1
										 AND user_id = $2
										 AND deleted_at IS NULL;`
			const values = [id, user_id]
			const result = await pool.query(query, values)
			const row = result.rows[0]
			if (row) {
				return new Category(row.id, row.user_id, row.name, row.color, row.bank_account_id, row.credit_card_id, row.created_at)
			}
			return null
		} catch (error) {
			console.log(error)
			throw error;
		}
	}

	static async createCategory(user_id, name, color, bank_account_id, credit_card_id) {
		try {
			const query = `INSERT INTO ${table} (user_id, name, color, bank_account_id, credit_card_id)
										 VALUES($1, $2, $3, $4, $5)
										 RETURNING *;`
			const values = [user_id, name, color, bank_account_id, credit_card_id]
			const result = await pool.query(query, values)
			const row = result.rows[0]
			return new Category(row.id, row.user_id, row.name, row.color, row.bank_account_id, row.credit_card_id, row.created_at)
		} catch (error) {
			console.log(error)
			throw error;
		}
	}

	static async updateCategory(id, user_id, name, color, bank_account_id, credit_card_id) {
		try {
			const query = `UPDATE ${table}
										 SET name = $1, 
												color = $2, 
												bank_account_id = $3, 
												credit_card_id = $4
										 WHERE id = $4 
												AND user_id = $5
												AND deleted_at IS NULL
										 RETURNING *;`
			const values = [name, color, bank_account_id, credit_card_id, id, user_id]
			const result = await pool.query(query, values)
			if (result.rowCount === 0) {
				return null
			}
			const row = result.rows[0]
			return new Category(row.id, row.user_id, row.name, row.color, row.bank_account_id, row.credit_card_id, row.created_at)
		} catch (error) {
			console.log(error)
			throw error;
		}
	}

	static async deleteCategory(id, user_id) {
		try {
			const query = `UPDATE ${table}
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