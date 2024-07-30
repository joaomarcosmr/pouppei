export interface IBankAccount {
	id: number;
	name: string;
	icon: string;
	balance?: number;
	add_general_balance: boolean;
}

export interface BankAccountResponse {
	status: number;
	data?: IBankAccount;
	error?: string;
}