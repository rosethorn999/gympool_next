export type Country = {
	county: string;
	count: number;
};
export type Contract = {
	title: string;
	monthly_rental: number;
	id: string;
	description: string;
	creator: User;
	gym_type: number;
	store: string;
	county: string;
	district: string;
	expiry_date: string;
	features: number[];
	processing_fee: number;
	create_time: string;
	modify_time: string;
	inventory: number;
	view?: number;
};
export type RegisterUser = {
	email: string;
	password: string;
	first_name: string;
	last_name: string;
};
export type User = {
	id: string;
	email: string;
	is_active: boolean;
	is_superuser: boolean;
	is_verified: boolean;
	first_name: string;
	last_name: string;
	facebook_id: string;
	line_id: string;
	county: string;
	district: string;
	modify_time: string;
	birth_date: string;
	mobile: string;
	create_time: string;
	last_login: string;
};
export type Pagination<T> = {
	count: number;
	results: T[];
};
