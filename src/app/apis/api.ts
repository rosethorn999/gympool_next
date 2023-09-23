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
	const url = '/group-by-county/';
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

async function getRecords({ county = '全部區域', q = '' }: { county?: string; q?: string }) {
	// const isMobileWidth = window.innerWidth <= 480;
	const _page_size = 15; // isMobileWidth ? 7 : 15; // mobile show 7 items, pc 15 items
	let url = `/record/?page_size=${_page_size}`;
	if (county !== '全部區域') url = `${url}&county=${county}`;
	if (q !== '') url = `${url}&q=${q}`;
	const records = await basicRequest.get<IRecord[]>(url).then((response: any) => {
		const { count, results } = response.data;
		return results;
	});
	return records;
}

async function getRecord(id: number) {
	const url = `/record/${id}`;
	const records = await basicRequest.get<IRecord>(url).then((response: any) => {
		return response.data;
	});
	return records;
}
export { host, getRecords, getCountyScatter, getRecord };
export default basicRequest;
