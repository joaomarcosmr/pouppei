const pool = require(`../database/db`);

class Income {
	constructor(id, name, color, emoji, createdAt) {
		this.id = id;
		this.name = name;
		this.color = color;
		this.emoji = emoji;
		this.createdAt = createdAt;
	}

	static async getAllIncomes() {
		try {
			const query = `SELECT * FROM incomes;`;
			const result = await pool.query(query);
			const row = result.rows;
			if (!row) {
				return null;
			}
			return row.map(row => new Income(row.id, row.name, row.color, row.emoji, row.createdAt));
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getIncomebyId(id) {
		try {
			const query = `SELECT * FROM incomes
										 WHERE id = $1;`;
			const values = [id];
			const result = await pool.query(query, values)
			const row = result.rows[0];
			if (row) {
				return new Income(row.id, row.name, row.color, row.emoji, row.createdAt);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async createIncome(name, color, emoji) {
		try {
			const query = `INSERT INTO incomes (name, color, emoji)
										 VALUES($1, $2, $3)
										 RETURNING *;`;
			const values = [name, color, emoji];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new Income(row.id, row.name, row.color, row.emoji, row.createdAt);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async updateIncome(id, name, color, emoji) {
		try {
			const query = `UPDATE incomes
										 SET name = $1, color = $2, emoji = $3
										 WHERE id = $4
										 RETURNING *;`;
			const values = [name, color, emoji, id];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new Income(row.id, row.name, row.color, row.emoji, row.createdAt);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async deleteIncome(id) {
		try {
			const query = `DELETE FROM incomes
										 WHERE id = $1
										 RETURNING *;`;
			const values = [id];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new Income(row.id, row.name, row.color, row.emoji, row.createdAt);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}

module.exports = Income;