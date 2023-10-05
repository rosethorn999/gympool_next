export interface ICountry {
	county: string;
	count: number;
}
export interface IContract {
	title: string;
	monthly_rental: number;
	id: string;
	description: string;
	creator: string;
	gym_type: number;
	store: string;
	county: string;
	district: string;
	expiry_date: string;
	features: number[];
	processing_fee: number;
	create_time: string;
	inventory: number;
}
export interface IUser {
	id: string;
}
