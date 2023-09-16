// 'use client';
import React from 'react';
// import { useState, useEffect } from 'react';
import RecordBox from '../components/RecordBox';
import loadingGif from '../../../public/loading.gif';
import basicRequest, { getRecords } from '../apis/api';
import selections from '../../../public/selections.json';
import zipCode from '../../../public/twZipCode.json';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

async function Record({ params }: any) {
	const baseRecordUrl = '/records/';
	const municipalities = ['臺北', '新北', '臺中', '臺南', '高雄'];
	// const history = useHistory();
	// const [currentPage, setCurrentPage] = useState(0);
	const { page: currentPage = 0 } = params;
	console.log(params);
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

	const records = await getRecords();
	const activeTab = '新北';
	const selection = {
		zipCode,
		gym_types: selections[0].list,
	};
	// const [searchBarText] = useState('');
	// const [fetchRecordUrl, setFetchRecordUrl] = useState(baseRecordUrl);
	// const [activeTab, setActiveTab] = useState('全部');
	// const [search, setSearch] = useState('');
	// let query = useQuery();

	// useEffect(() => {
	// 	prepareFetchUrl();
	// }, [currentPage, pagination.pageIndex, searchBarText, activeTab]);
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
	function handleChange(event: any) {
		switch (event.target.name) {
			case 'search':
				// setSearch(event.target.value.trim());
				break;
			default:
				break;
		}
	}

	return (
		<div className="records w-full">
			<div className="h-full w-full p-5 md:py-0">
				<div className="list-header my-2 flex flex-row flex-wrap gap-2">
					<div className="search-bar relative flex w-full rounded-xl align-middle md:w-1/2 ">
						<select className="search-select inline-block h-8 w-20 rounded-l-2xl border-none bg-white px-2 align-middle outline outline-1 outline-offset-0 outline-whisper focus-visible:outline-1 md:p-1 md:pl-2">
							<option value="1">標題</option>
						</select>
						<input
							name="search"
							type="text"
							className="search-text-box box-border h-8 w-[calc(100%-4rem)] border-y border-l border-whisper p-1 align-middle"
							// onChange={handleChange}
						/>
						<button className="search-btn h-8 w-16 rounded-r-2xl border-y border-r border-whisper bg-transparent px-4 text-center text-lg leading-8 md:w-16 md:border-y md:p-0 md:align-middle md:leading-8 md:text-nightRider">
							<FontAwesomeIcon icon={faMagnifyingGlass} />
						</button>
					</div>
					<div className="query-fun block h-8 w-full overflow-auto whitespace-nowrap align-middle md:w-1/3">
						<select className="country-tab-container h-full w-full list-none rounded-2xl border-whisper">
							{['全部區', ...municipalities].map((o, i) => {
								return (
									<option
										key={o}
										className={`country-tab inline-block cursor-pointer px-2 text-center ${
											activeTab === o ? 'active bg-whisper text-persianRed' : ''
										}`}
										// onClick={() => setActiveTab(o)}
									>
										{o}
									</option>
								);
							})}
						</select>
					</div>
				</div>
				<div className="record-container">
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
								<a key={r.id} className="mb-2" href={`/records/${r.id}`}>
									<RecordBox r={r} />
								</a>
							);
						})
					)}
					<div className="pagination-block mt-12 h-24 text-center">
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
		</div>
	);
}

export default Record;
