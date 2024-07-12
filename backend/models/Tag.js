const pool = require(`../database/db`);
const table = `tag`;

class Tags {
	constructor(id, user_id, description, color, created_at, deleted_at) {
		this.id = id;
		this.user_id = user_id;
		this.description = description;
		this.color = color;
		this.created_at = created_at;
		this.deleted_at = deleted_at;
	}

	static async getAllTags(user_id) {
		try {
			const query = `SELECT * FROM ${table}
											WHERE user_id = $1
											AND deleted_at IS NULL;`;
			const values = [user_id];
			const result = await pool.query(query, values);
			const rows = result.rows;
			if (!rows) {
				return null;
			}
			return rows.map(row => new Tags(row.id, row.user_id, row.description, row.color, row.created_at));
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getTagById(user_id, id) {
		try {
			const query = `SELECT * FROM ${table}
											WHERE id = $1
											AND user_id = $2
											AND deleted_at IS NULL;`;
			const values = [id, user_id];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new Tags(row.id, row.user_id, row.description, row.color, row.created_at);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async createTag(user_id, description, color) {
		try {
			const query = `INSERT INTO ${table} (user_id, description, color)
											VALUES($1, $2, $3)
											RETURNING *;`;
			const values = [user_id, description, color];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new Tags(row.id, row.user_id, row.description, row.color, row.created_at);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async updateTag(id, user_id, description, color) {
		try {
			const query = `UPDATE ${table}
											SET description = $1
													color = $2
											WHERE id = $3
											AND user_id = $4
											RETURNING *;`;
			const values = [description, color, id, user_id];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new Tags(row.id, row.user_id, row.description, row.color, row.created_at);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async deleteTag(id, user_id) {
		try {
			const query = `UPDATE ${table}
											SET deleted_at = NOW()
											WHERE id = $1
											AND user_id = $2
											RETURNING *;`;
			const values = [id, user_id];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new Tags(row.id, row.user_id, row.description, row.color, row.created_at);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}

module.exports = Tags;