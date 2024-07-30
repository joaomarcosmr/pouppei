const pool = require('../database/db')
const table = `categories`

class Category {
	constructor(id, user_id, name, icon, category_type, created_at) {
		this.id = id;
		this.user_id = user_id;
		this.name = name;
		this.icon = icon;
		this.category_type = category_type;
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
			return rows.map(row => new Category(row.id, row.user_id, row.name, row.icon, row.category_type, row.created_at));
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getCategoryById(id, user_id) {
		try {
			const query = `
				SELECT * FROM ${table}
				WHERE id = $1
				AND user_id = $2
				AND deleted_at IS NULL;
    `;
			const values = [id, user_id];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				const category = {
					id: row.id,
					user_id: row.user_id,
					name: row.name,
					icon: row.icon,
					category_type: row.category_type,
					created_at: row.created_at
				};

				return category;
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}


	static async createCategory(user_id, name, icon, category_type) {
		try {
			const query = `INSERT INTO ${table} (user_id, name, icon, category_type)
										 VALUES($1, $2, $3, $4)
										 RETURNING *;`
			const values = [user_id, name, icon, category_type]
			const result = await pool.query(query, values)
			const row = result.rows[0]
			return new Category(row.id, row.user_id, row.name, row.icon, row.category_type, row.created_at)
		} catch (error) {
			console.log(error)
			throw error;
		}
	}

	static async updateCategory(id, user_id, name, icon, category_type) {
		try {
			const query = `UPDATE ${table}
										 SET name = $1, 
												icon = $2, 
												category_type = $3,
										 WHERE id = $4
												AND user_id = $5
												AND deleted_at IS NULL
										 RETURNING *;`
			const values = [name, icon, category_type, id, user_id]
			const result = await pool.query(query, values)
			if (result.rowCount === 0) {
				return null
			}
			const row = result.rows[0]
			return new Category(row.id, row.user_id, row.name, row.icon, row.category_type, row.created_at)
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