import axios from 'axios';
import { IRecord } from '../../app/type/type';
import Cookies from 'js-cookie';
// let host = process.env.REACT_APP_HOST;
const host = 'https://gympool-stg.nodm.app/api/';

const basicRequest = axios.create({
	baseURL: host,
});

basicRequest.interceptors.request.use(
	(config) => {
		const token = Cookies.get('token');
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
	const url = '/records/group-by-county';
	const countyScatter = await basicRequest.get<IRecord[]>(url).then((response: any) => {
		let list = response.data;
		list.splice(4, list.length);
		list.sort((a: any, b: any) => {
			return b.count - a.count;
		});
		return list;
	});
	return countyScatter;
}

async function getRecords({
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
	let url = `/records?page_size=${page_size}`;
	if (page > 0) url = `${url}&page=${page}`;
	if (county !== '全部區域') url = `${url}&county=${county}`;
	if (q !== '') url = `${url}&q=${q}`;
	const records = await basicRequest.get<IRecord[]>(url).then((response: any) => {
		return response.data;
	});
	return records;
}

async function getRecord(id: number) {
	const url = `/records/${id}`;
	const record = await basicRequest.get<IRecord>(url).then((response: any) => {
		return response.data;
	});
	return record;
}
export { host, getRecords, getCountyScatter, getRecord };
export default basicRequest;
