const pool = require('../database/db');

class CreditCard {
	constructor(id, user_id, name, icon, credit_limit, dueDate, created_at) {
		this.id = id;
		this.user_id = user_id;
		this.name = name;
		this.icon = icon;
		this.credit_limit = credit_limit;
		this.dueDate = dueDate;
		this.created_at = created_at;
	}

	static async getAllCreditCards(user_id) {
		try {
			const query = `SELECT * FROM credit_card
										 WHERE user_id = $1
										 AND deleted_at IS NULL;`;
			const values = [user_id]
			const result = pool.query(query, values);
			const row = result.rows;
			if (!row) {
				return null;
			}
			return row.map(row => new CreditCard(row.id, row.user_id, row.name, row.icon, row.credit_limit, row.dueDate, row.created_at));
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getCreditCardById(id, user_id) {
		try {
			const query = `SELECT * FROM credit_card
										 WHERE id = $1 
										 AND user_id = $2
										 AND deleted_at IS NULL;`;
			const values = [id, user_id];
			const result = pool.query(query, values)
			const row = result.rows[0];
			if (row) {
				return new CreditCard(row.id, row.user_id, row.name, row.icon, row.credit_limit, row.dueDate, row.created_at);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async createCreditCard(user_id, name, icon, credit_limit, dueDate) {
		try {
			const query = `INSERT INTO credit_card (user_id, name, icon, credit_limit, dueDate)
										 VALUES($1, $2, $3, $4, $5)
										 RETURNING *;`;
			const values = [user_id, name, icon, credit_limit, dueDate];
			const result = pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new CreditCard(row.id, row.user_id, row.name, row.icon, row.credit_limit, row.dueDate, row.created_at);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async updateCreditCard(id, user_id, name, icon, limit, dueDate) {
		try {
			const query = `UPDATE credit_card
										 SET name = $1, icon = $2, limit = $3, dueDate = $4
										 WHERE id = $5 
										 AND user_id = $6 
										 AND deleted_at IS NULL
										 RETURNING *;`;
			const values = [name, icon, limit, dueDate, id, user_id];
			const result = pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new CreditCard(row.id, row.user_id, row.name, row.icon, row.credit_limit, row.dueDate, row.created_at);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async deleteCreditCard(id, user_id) {
		try {
			const query = `UPDATE credit_card
										 SET deleted_at = NOW()
										 WHERE id = $1 
										 AND user_id = $2 
										 AND deleted_at IS NULL
										 RETURNING *;`;
			const values = [id, user_id];
			const result = pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return row
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}

module.exports = CreditCard;