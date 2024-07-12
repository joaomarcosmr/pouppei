const pool = require(`../database/db`);
const table = `revenue`;

class Revenue {
	constructor(id, user_id, name, icon, created_at, deleted_at) {
		this.id = id;
		this.user_id = user_id;
		this.name = name;
		this.icon = icon;
		this.created_at = created_at;
		this.deleted_at = deleted_at;
	}

	static async getAllRevenue(user_id) {
		try {
			const query = `SELECT * FROM ${table}
										 WHERE user_id = $1
										 AND deleted_at IS NULL;`;
			const values = [user_id]
			const result = await pool.query(query, values);
			const row = result.rows;
			if (!row) {
				return null;
			}
			return row.map(row => new Revenue(row.id, row.user_id, row.name, row.icon, row.created_at));
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getRevenuebyId(id, user_id) {
		try {
			const query = `SELECT * FROM ${table}
										 WHERE id = $1 
										 AND user_id = $2
										 AND deleted_at IS NULL;`;
			const values = [id, user_id];
			const result = await pool.query(query, values)
			const row = result.rows[0];
			if (row) {
				return new Revenue(row.id, row.user_id, row.name, row.icon, row.created_at);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async createRevenue(user_id, name, icon) {
		try {
			const query = `INSERT INTO ${table} (user_id, name, icon)
										 VALUES($1, $2, $3)
										 RETURNING *;`;
			const values = [user_id, name, icon];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new Revenue(row.id, row.user_id, row.name, row.icon, row.created_at);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async updateRevenue(id, user_id, name, icon) {
		try {
			const query = `UPDATE ${table}
										 SET name = $1, icon = $2
										 WHERE id = $3
										 AND user_id = $4
										 AND deleted_at IS NULL
										 RETURNING *;`;
			const values = [name, icon, id, user_id];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new Revenue(row.id, row.user_id, row.name, row.icon, row.created_at);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async deleteRevenue(id, user_id) {
		try {
			const query = `UPDATE ${table}
										 SET deleted_at = NOW()
										 WHERE id = $1 
										 AND user_id = $2
										 AND deleted_at IS NULL
										 RETURNING *;`;
			const values = [id, user_id];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new Revenue(row.id, row.user_id, row.name, row.icon, row.created_at);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}

module.exports = Revenue;