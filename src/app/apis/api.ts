import axios from 'axios';
import { Contract, User } from '../../app/type/type';
import Cookies from 'js-cookie';
const host = process.env.NEXT_PUBLIC_API_HOST;
// const host = 'http://localhost:8000';
// const host = 'https://gympool-stg-fastapi.nodm.app/';

const basicRequest = axios.create({
	baseURL: host,
});

basicRequest.interceptors.request.use(
	(config) => {
		const token = Cookies.get('token');
		const user_id = Cookies.get('user_id');
		if (token) {
			config.headers['Authorization'] = token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

async function getCountyScatter() {
	const url = '/contracts/group-by-county';
	const countyScatter = await basicRequest.get<Contract[]>(url).then((response: any) => {
		let list = response.data;
		list.splice(4, list.length);
		list.sort((a: any, b: any) => {
			return b.count - a.count;
		});
		return list;
	});
	return countyScatter;
}

async function getContracts({
	page_size = 10,
	page = 1,
	county = '全部區域',
	q = '',
}: {
	page_size?: number;
	page?: number;
	county?: string;
	q?: string;
}) {
	let url = `/contracts?page_size=${page_size}`;
	if (page > 0) url = `${url}&page=${page}`;
	if (county !== '全部區域') url = `${url}&county=${county}`;
	if (q !== '') url = `${url}&q=${q}`;
	const contracts = await basicRequest.get<Contract[]>(url).then((response: any) => {
		return response.data;
	});
	return contracts;
}

async function getMyContracts(
	{
		user_id,
		page_size = 10,
		page = 1,
	}: {
		user_id: string;
		page_size?: number;
		page?: number;
	},
	abortController?: AbortController
) {
	let url = `/users/${user_id}/contracts?page_size=${page_size}`;
	if (page > 0) url = `${url}&page=${page}`;
	const contracts = await basicRequest
		.get<Contract[]>(url, { signal: abortController?.signal })
		.then((response: any) => {
			return response.data;
		})
		.catch((error) => {});
	return contracts;
}

async function getContract(id: number, abortController?: AbortController) {
	const url = `/contracts/${id}`;
	const contract = await basicRequest
		.get<Contract>(url, { signal: abortController?.signal })
		.then((response: any) => {
			return response.data;
		})
		.catch((error) => {});
	return contract;
}
async function getUserMe(abortController?: AbortController) {
	const url = '/users/me';
	const user = await basicRequest
		.get<User>(url, { signal: abortController?.signal })
		.then((response: any) => {
			return response.data;
		})
		.catch((error) => {});
	return user;
}
export { host, getContracts, getMyContracts, getCountyScatter, getContract, getUserMe };
export default basicRequest;
