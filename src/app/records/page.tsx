// 'use client';
import React from 'react';
// import { useState, useEffect } from 'react';
import RecordBox from '../components/RecordBox';
import SearchBox from '../components/SearchBox';
import loadingGif from '../../../public/loading.gif';
import { getRecords } from '../apis/api';
import selections from '../../../public/selections.json';
import zipCode from '../../../public/twZipCode.json';
import Link from 'next/link';
import Image from 'next/image';
import { IRecord } from '../type/type';

async function Record({ params, searchParams }: any) {
	const baseRecordUrl = '/records/';
	// const history = useHistory();
	// const [currentPage, setCurrentPage] = useState(0);
	const { page: currentPage = 0 } = params;
	// const [pagination, setPagination] = useState<any>({
	// 	pageIndex: 1,
	// 	nextUrl: null,
	// 	previousUrl: null,
	// });
	// const [filter, setFilter] = useState({
	// 	gym_type: null,
	// 	county: null,
	// 	district: null,
	// });
	// const [ordering, setOrdering] = useState<any>({
	// 	create_time: null,
	// 	monthly_rental: null,
	// });
	// const [districts, setDistricts] = useState<any[]>([]);
	// TODO expiry_date is a key feature, should be set as order

	const records: IRecord[] = await getRecords({
		county: searchParams?.city,
		q: searchParams?.q,
	});
	const selection = {
		zipCode,
		gym_types: selections[0].list,
	};
	// const [searchBarText] = useState('');
	// const [fetchRecordUrl, setFetchRecordUrl] = useState(baseRecordUrl);
	// const [search, setSearch] = useState('');
	// let query = useQuery();

	function useQuery() {
		// const { search } = useLocation();
		// return React.useMemo(() => new URLSearchParams(search), [search]);
	}

	// function prepareFetchUrl() {
	// 	let url = baseRecordUrl;
	// 	let urlSearch = new URLSearchParams();

	// 	// filter
	// 	if (activeTab !== '全部') {
	// 		urlSearch.set('county', activeTab + '市');
	// 	}

	// 	// pagination
	// 	if (typeof currentPage === 'number') {
	// 		if (pagination.pageIndex !== 0) {
	// 			urlSearch.set('page', pagination.pageIndex);
	// 		}
	// 	}

	// 	// searchBarText
	// 	if (searchBarText) {
	// 		urlSearch.set('search', searchBarText);
	// 	}

	// 	// ordering
	// 	let tempOrdering: any[] = [];
	// 	let orderingCreate_time = ordering.create_time;
	// 	if (orderingCreate_time !== null) {
	// 		tempOrdering.push(orderingCreate_time + 'create_time');
	// 	}
	// 	let orderingMonthly_rental = ordering.monthly_rental;
	// 	if (orderingMonthly_rental !== null) {
	// 		tempOrdering.push(orderingMonthly_rental + 'monthly_rental');
	// 	}
	// 	if (ordering.length > 0) {
	// 		urlSearch.set('ordering', tempOrdering.toString());
	// 	}

	// 	let queries = urlSearch.toString();
	// 	if (queries) {
	// 		url += '?' + queries;
	// 	}

	// 	setFetchRecordUrl(url);
	// }

	// useEffect(() => {
	// 	let ret: any[] = [];
	// 	let selectedDistricts = selection.zipCode.find((item: any) => item.name === filter.county);

	// 	if (selectedDistricts) {
	// 		ret = selectedDistricts.districts;
	// 	}
	// 	setDistricts(ret);
	// }, [filter.county, selection.zipCode]);

	// function readRecord() {
	// 	if (currentPage === -1 && pagination.pageIndex === 1) {
	// 		console.log('page index is 1');
	// 		return;
	// 	} else if (currentPage === 1 && pagination.nextUrl === null) {
	// 		console.log('no next page');
	// 		return;
	// 	}

	// 	basicRequest.get(fetchRecordUrl).then((response) => {
	// 		const { results, next, previous } = response.data;
	// 		// setRecords(results);
	// 		setPagination({
	// 			pageIndex: pagination.pageIndex,
	// 			nextUrl: next,
	// 			previousUrl: previous,
	// 		});

	// 		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	// 	});
	// }

	// function handleFilterChange(event: any) {
	// 	setFilter({ ...filter, [event.target.name]: event.target.value });
	// }
	// function handleSorterChange(event: any) {
	// 	setOrdering({ ...ordering, [event.target.name]: event.target.value });
	// }

	return (
		<div className="records h-full w-full p-5 md:py-0">
			<div className="list-header my-2 flex flex-row flex-wrap gap-2 md:my-14">
				<SearchBox />
			</div>
			<div className="record-container flex flex-wrap gap-12">
				{records === null ? (
					<div>
						<Image src={loadingGif} alt="loading" />
					</div>
				) : null}

				{records?.length === 0 ? (
					<div>無資料</div>
				) : (
					records?.map((r: any, i: number) => {
						return (
							<a key={r.id} className="w-full" href={`/records/${r.id}`}>
								<RecordBox r={r} />
							</a>
						);
					})
				)}
				<div className="pagination-block mt-12 h-24 w-full text-center">
					<Link
						href={`records?page=${currentPage - 1}`}
						className="pagination-btn mx-2 cursor-pointer border border-whisper px-6 py-2 text-navyBlue opacity-70 hover:opacity-100 md:mx-12"
						// onClick={() => setCurrentPage(currentPage - 1)}
					>
						上一頁
					</Link>
					<Link
						href={`records?page=${currentPage + 1}`}
						className="pagination-btn mx-2 cursor-pointer border border-whisper px-6 py-2 text-navyBlue opacity-70 hover:opacity-100 md:mx-12"
						// onClick={() => setCurrentPage(currentPage + 1)}
					>
						下一頁
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Record;
