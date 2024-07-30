export interface ICategory {
	id: number;
	name?: string;
	icon?: string;
	category_type?: string;
}

export interface CategoryResponse {
	status: number;
	data?: ICategory;
	error?: string;
}