const pool = require('../database/db');
const table = `credit_card`;

class CreditCard {
	constructor(id, user_id, name, icon, credit_limit, due_date, invoice, created_at) {
		this.id = id;
		this.user_id = user_id;
		this.name = name;
		this.icon = icon;
		this.invoice = invoice;
		this.credit_limit = credit_limit;
		this.due_date = due_date;
		this.created_at = created_at;
	}

	static async getAllCreditCards(user_id) {
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
			return row.map(row => new CreditCard(row.id, row.user_id, row.name, row.icon, row.credit_limit, row.due_date, row.invoice, row.created_at));
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getCreditCardById(id, user_id) {
		try {
			const query = `SELECT * FROM ${table}
										 WHERE id = $1 
										 AND user_id = $2
										 AND deleted_at IS NULL;`;
			const values = [id, user_id];
			const result = await pool.query(query, values)
			const row = result.rows[0];
			if (row) {
				return new CreditCard(row.id, row.user_id, row.name, row.icon, row.credit_limit, row.due_date, row.invoice, row.created_at);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async createCreditCard(user_id, name, icon, credit_limit, due_date, invoice) {
		try {
			const query = `INSERT INTO ${table} (user_id, name, icon, credit_limit, due_date, invoice)
										 VALUES($1, $2, $3, $4, $5, $6)
										 RETURNING *;`;
			const values = [user_id, name, icon, credit_limit, due_date, invoice];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new CreditCard(row.id, row.user_id, row.name, row.icon, row.credit_limit, row.due_date, row.invoice, row.created_at);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async updateCreditCard(id, user_id, name, icon, credit_limit, due_date, invoice) {
		try {
			const query = `UPDATE ${table}
										 SET name = $1, icon = $2, credit_limit = $3, due_date = $4, invoice = $5
										 WHERE id = $6
										 AND user_id = $7 
										 AND deleted_at IS NULL
										 RETURNING *;`;
			const values = [name, icon, credit_limit, due_date, invoice, id, user_id];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new CreditCard(row.id, row.user_id, row.name, row.icon, row.credit_limit, row.due_date, row.invoice, row.created_at);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async deleteCreditCard(id, user_id) {
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