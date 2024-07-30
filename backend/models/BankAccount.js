const pool = require('../database/db');
const table = `bank_account`;

class BankAccount {
	constructor(id, user_id, name, icon, add_general_balance, balance, created_at) {
		this.id = id;
		this.user_id = user_id;
		this.name = name;
		this.icon = icon;
		this.add_general_balance = add_general_balance;
		this.balance = balance;
		this.created_at = created_at;
	}

	static async getAllBankAccount(user_id) {
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
			return row.map(row => new BankAccount(row.id, row.user_id, row.name, row.icon, row.add_general_balance, row.balance, row.created_at));
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getBankAccountById(id, user_id) {
		try {
			const query = `SELECT * FROM ${table}
										 WHERE id = $1 
										 AND user_id = $2
										 AND deleted_at IS NULL;`;
			const values = [id, user_id];
			const result = await pool.query(query, values)
			const row = result.rows[0];
			if (row) {
				return new BankAccount(row.id, row.user_id, row.name, row.icon, row.add_general_balance, row.balance, row.created_at);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async createBankAccount(user_id, name, icon, add_general_balance, balance) {
		try {
			const query = `INSERT INTO ${table} (user_id, name, icon, add_general_balance, balance)
										 VALUES($1, $2, $3, $4, $5)
										 RETURNING *;`;
			const values = [user_id, name, icon, add_general_balance, balance];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new BankAccount(row.id, row.user_id, row.name, row.icon, row.add_general_balance, row.balance, row.created_at);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async updateBankAccount(id, user_id, name, icon, add_general_balance, balance) {
		try {
			const query = `UPDATE ${table}
										 SET name = $1, 
										 		 icon = $2,
												 add_general_balance = $3
												 balance = $4
										 WHERE id = $5
										 AND user_id = $6
										 AND deleted_at IS NULL
										 RETURNING *;`;
			const values = [name, icon, add_general_balance, balance, id, user_id];
			const result = await pool.query(query, values);
			const row = result.rows[0];
			if (row) {
				return new BankAccount(row.id, row.user_id, row.name, row.icon, row.add_general_balance, row.balance, row.created_at);
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async deleteBankAccount(id, user_id) {
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

module.exports = BankAccount;