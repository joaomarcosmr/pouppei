const pool = require('../database/db');
const table = `transactions`;

class Transaction {
	constructor(id, user_id, category_id, description, amount, date, attachments, repeat_transaction_inverval, last_transaction, tag_id, credit_card_id, bank_account_id, created_at, deleted_at) {
		this.id = id;
		this.user_id = user_id;
		this.category_id = category_id;
		this.description = description;
		this.amount = amount;
		this.date = date;
		this.attachments = attachments;
		this.tag_id = tag_id;
		this.repeat_transaction_inverval = repeat_transaction_inverval;
		this.last_transaction = last_transaction;
		this.credit_card_id = credit_card_id;
		this.bank_account_id = bank_account_id;
		this.created_at = created_at;
		this.deleted_at = deleted_at;
	}

	static async getAllTransactions(user_id) {
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
			return rows.map(row => new Transaction(row.id, row.user_id, row.category_id, row.description,
				row.amount, row.date, row.attachments, row.tag_id, row.repeat_transaction_inverval,
				row.last_transaction, row.credit_card_id, row.bank_account_id, row.created_at));
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
						 bk.name AS bank_account_name
								FROM transactions tr
								LEFT JOIN categories c ON tr.category_id = c.id
								LEFT JOIN tags tg ON tr.tag_id = tg.id
								LEFT JOIN credit_card cc ON tr.credit_card_id = cc.id
								LEFT JOIN bank_account bk ON tr.bank_account_id = bk.id
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
					attachments: row.attachments,
					last_transaction: row.last_transaction,
					repeat_transaction_inverval: row.repeat_transaction_inverval,
					tag_id: row.tag_id,
					tag_name: row.tag_name,
					credit_card_id: row.credit_card_id,
					credit_card_name: row.credit_card_name,
					bank_account_id: row.bank_account_id,
					bank_account_name: row.bank_account_name,
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

	static async createTransaction(user_id, category_id, description, amount, date, attachments, tag_id, repeat_transaction_inverval, last_transaction, credit_card_id, bank_account_id) {
		try {
			const query = `INSERT INTO ${table} (user_id, category_id, description, amount, date, attachments, tag_id, repeat_transaction_inverval, last_transaction, credit_card_id, bank_account_id)
											VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
											RETURNING *;`;
			const values = [user_id, category_id, description, amount, date, attachments, tag_id, repeat_transaction_inverval, last_transaction, credit_card_id, bank_account_id];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new Transaction(row.id, row.user_id, row.category_id, row.description,
					row.amount, row.date, row.attachments, row.tag_id, row.repeat_transaction_inverval,
					row.last_transaction, row.credit_card_id, row.bank_account_id, row.created_at);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async updateTransaction(id, user_id, category_id, description, amount, date, attachments, tag_id, repeat_transaction_interval, last_transaction, credit_card_id, bank_account_id) {
		try {
			const updateQuery = `
            UPDATE ${table}
            SET category_id = $1,
                description = $2,
                amount = $3,
                date = $4,
                tag_id = $5,
                credit_card_id = $6,
                bank_account_id = $7,
                repeat_transaction_interval = $8,
                last_transaction = $9,
                attachments = $10
            WHERE id = $11
            AND user_id = $12
            RETURNING *;
        `;
			const updateValues = [category_id, description, amount, date, tag_id, credit_card_id, bank_account_id, repeat_transaction_interval, last_transaction, attachments, id, user_id];
			const updateResult = await pool.query(updateQuery, updateValues);
			const updatedRow = updateResult.rows[0];

			if (!updatedRow) {
				return null;
			}

			const selectQuery = `
            SELECT ut.*,
                   c.name AS category_name,
                   tg.name AS tag_name,
                   cc.name AS credit_card_name,
                   ba.name AS bank_account_name
            FROM transactions ut
            LEFT JOIN categories c ON ut.category_id = c.id
            LEFT JOIN tags tg ON ut.tag_id = tg.id
            LEFT JOIN credit_card cc ON ut.credit_card_id = cc.id
            LEFT JOIN bank_account ba ON ut.bank_account_id = ba.id
            WHERE ut.id = $1
							AND ut.user_id = $2;
        `;
			const selectValues = [id, user_id];
			const selectResult = await pool.query(selectQuery, selectValues);
			const row = selectResult.rows[0];

			if (row) {
				return {
					id: row.id,
					user_id: row.user_id,
					category_id: row.category_id,
					category_name: row.category_name,
					description: row.description,
					amount: row.amount,
					date: row.date,
					attachments: row.attachments,
					last_transaction: row.last_transaction,
					repeat_transaction_interval: row.repeat_transaction_interval,
					tag_id: row.tag_id,
					tag_name: row.tag_name,
					credit_card_id: row.credit_card_id,
					credit_card_name: row.credit_card_name,
					bank_account_id: row.bank_account_id,
					bank_account_name: row.bank_account_name,
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
			const query = `UPDATE ${table}
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