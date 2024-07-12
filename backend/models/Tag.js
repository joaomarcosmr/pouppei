const pool = require(`../database/db`);

class Tags {
	constructor(id, user_id, name, deleted_at) {
		this.id = id;
		this.user_id = user_id;
		this.name = name;
		this.deleted_at = deleted_at;
	}

	static async getAllTags(user_id) {
		try {
			const query = `SELECT * FROM tags
											WHERE user_id = $1
											AND deleted_at IS NULL;`;
			const values = [user_id];
			const result = await pool.query(query, values);
			const rows = result.rows;
			if (!rows) {
				return null;
			}
			return rows.map(row => new Tags(row.id, row.user_id, row.name));
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getTagById(user_id, id) {
		try {
			const query = `SELECT * FROM tags
											WHERE id = $1
											AND user_id = $2
											AND deleted_at IS NULL;`;
			const values = [id, user_id];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new Tags(row.id, row.user_id, row.name);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async createTag(user_id, name) {
		try {
			const query = `INSERT INTO tags (user_id, name)
											VALUES($1, $2)
											RETURNING *;`;
			const values = [user_id, name];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new Tags(row.id, row.user_id, row.name);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async updateTag(id, user_id, name) {
		try {
			const query = `UPDATE tags
											SET name = $1
											WHERE id = $2
											AND user_id = $3
											RETURNING *;`;
			const values = [name, id, user_id];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new Tags(row.id, row.user_id, row.name);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async deleteTag(id, user_id) {
		try {
			const query = `UPDATE tags
											SET deleted_at = NOW()
											WHERE id = $1
											AND user_id = $2
											RETURNING *;`;
			const values = [id, user_id];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new Tags(row.id, row.user_id, row.name, row.deleted_at);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}

module.exports = Tags;