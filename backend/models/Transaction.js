const pool = require('../database/db');

class Transaction {
	constructor(id, user_id, category_id, description, amount, date, tag_id, credit_card_id, created_at, deleted_at) {
		this.id = id;
		this.user_id = user_id;
		this.category_id = category_id;
		this.description = description;
		this.amount = amount;
		this.date = date;
		this.tag_id = tag_id;
		this.credit_card_id = credit_card_id;
		this.created_at = created_at;
		this.deleted_at = deleted_at;
	}

	static async getAllTransactions(user_id) {
		try {
			const query = `SELECT * FROM transactions
											WHERE user_id = $1
											AND deleted_at IS NULL;`;
			const values = [user_id];
			const result = await pool.query(query, values);
			const rows = result.rows;
			if (!rows) {
				return null;
			}
			return rows.map(row => new Transaction(row.id, row.user_id, row.category_id, row.description, row.amount, row.date, row.tag_id, row.credit_card_id, row.created_at));
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getTransactionById(id, user_id) {
		try {
			const query = `SELECT tr.*, 
             c.name AS category_name, 
             tg.name AS tag_name, 
             cc.name AS credit_card_name
								FROM transactions tr
								LEFT JOIN categories c ON tr.category_id = c.id
								LEFT JOIN tags tg ON tr.tag_id = tg.id
								LEFT JOIN credit_card cc ON tr.credit_card_id = cc.id
						WHERE tr.id = $1
						AND tr.user_id = $2
						AND tr.deleted_at IS NULL;`;
			const values = [id, user_id];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return {
					id: row.id,
					user_id: row.user_id,
					category_id: row.category_id,
					category_name: row.category_name,
					description: row.description,
					amount: row.amount,
					date: row.date,
					tag_id: row.tag_id,
					tag_name: row.tag_name,
					credit_card_id: row.credit_card_id,
					credit_card_name: row.credit_card_name,
					created_at: row.created_at,
					deleted_at: row.deleted_at
				};
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async createTransaction(user_id, category_id, description, amount, date, tag_id, credit_card_id) {
		try {
			const query = `INSERT INTO transactions (user_id, category_id, description, amount, date, tag_id, credit_card_id)
											VALUES($1, $2, $3, $4, $5, $6, $7)
											RETURNING *;`;
			const values = [user_id, category_id, description, amount, date, tag_id, credit_card_id];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new Transaction(row.id, row.user_id, row.category_id, row.description, row.amount, row.date, row.tag_id, row.credit_card_id, row.created_at);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async updateTransaction(id, user_id, category_id, description, amount, date, tag_id, credit_card_id) {
		try {
			const query = `WITH updated_transaction AS (
											UPDATE transactions
											SET category_id = $1,
													description = $2,
													amount = $3,
													date = $4,
													tag_id = $5,
													credit_card_id = $6
											WHERE id = $7
											AND user_id = $8
											RETURNING *
											)
											SELECT ut.*,
														 c.name AS category_name,
														 tg.name AS tag_name,
														 cc.name AS credit_card_name
											FROM updated_transaction ut
											LEFT JOIN categories c ON ut.category_id = c.id
											LEFT JOIN tags tg ON ut.tag_id = tg.id
											LEFT JOIN credit_card cc ON ut.credit_card_id = cc.id;`;
			const values = [category_id, description, amount, date, tag_id, credit_card_id, id, user_id];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return {
					id: row.id,
					user_id: row.user_id,
					category_id: row.category_id,
					category_name: row.category_name,
					description: row.description,
					amount: row.amount,
					date: row.date,
					tag_id: row.tag_id,
					tag_name: row.tag_name,
					credit_card_id: row.credit_card_id,
					credit_card_name: row.credit_card_name,
					created_at: row.created_at,
					deleted_at: row.deleted_at
				};
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async deleteTransaction(id, user_id) {
		try {
			const query = `UPDATE transactions
											SET deleted_at = NOW()
											WHERE id = $1
											AND user_id = $2
											RETURNING *;`;
			const values = [id, user_id];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return row;
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}

module.exports = Transaction;