const pool = require('../database/db');

class CreditCard {
	constructor(id, user_id, name, icon, limit, dueDate, created_at) {
		this.id = id;
		this.user_id = user_id;
		this.name = name;
		this.icon = icon;
		this.limit = limit;
		this.dueDate = dueDate;
		this.created_at = created_at;
	}
}