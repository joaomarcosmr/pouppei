export interface ICreditCard {
	id?: number;
	name: string;
	icon: string;
	invoice: number;
	due_date: number;
	close_date: number;
	credit_limit: number;
}

export interface CreditCardResponse {
	status: number;
	data?: ICreditCard;
	error?: string;
}