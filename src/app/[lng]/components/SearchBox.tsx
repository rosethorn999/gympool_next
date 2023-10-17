'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import Link from 'next/link';

export default function SearchBox({ lng }: any) {
	const { t } = useTranslation(lng, 'contracts');
	const searchParams = useSearchParams();

	const cities = [t('all'), '臺北市', '新北市', '臺中市', '臺南市', '高雄市'];
	const urlParams = {
		county: searchParams.get('county') || cities[0],
		page: Number(searchParams.get('page')) || 1,
		q: searchParams.get('q'),
	};

	const [selectedCounty, setSelectedCounty] = useState(urlParams.county);
	const [searchBoxText, setSearchBoxText] = useState('');

	useEffect(() => {
		if (urlParams.q) setSearchBoxText(urlParams.q);
	}, [urlParams.q]);

	useEffect(() => {
		if (selectedCounty !== urlParams.county) {
			const baseUrl = `/${lng}/contracts`;
			const params = new URLSearchParams();
			if (selectedCounty !== cities[0]) {
				params.set('county', selectedCounty);
			}
			if (searchBoxText) {
				params.set('q', searchBoxText);
			}
			if (urlParams.page > 1) {
				params.set('page', urlParams.page.toFixed());
			}
			const urlWithParams = `${baseUrl}/?${params.toString()}`;
			redirect(urlWithParams);
		}
	}, [selectedCounty, urlParams.county]);

	return (
		<>
			<div className="search-bar relative flex w-full rounded-3xl align-middle md:w-1/2 ">
				<select className="search-select inline-block h-8 w-20 rounded-l-2xl border-none bg-white px-2 text-center align-middle outline outline-1 outline-offset-0 outline-whisper focus-visible:outline-1 md:p-1 md:pl-2">
					<option value="1">{t('title')}</option>
				</select>
				<input
					name="search"
					type="text"
					className="search-text-box box-border h-8 w-[calc(100%-4rem)] border-y border-l border-whisper p-1 align-middle"
					value={searchBoxText}
					onChange={(e) => setSearchBoxText(e.target.value)}
				/>
				<Link
					className="search-btn h-8 w-16 rounded-r-2xl border-y border-r border-whisper bg-transparent px-4 text-center text-lg leading-8 opacity-70 hover:opacity-100 md:w-16 md:border-y md:p-0 md:align-middle md:leading-8 md:text-nightRider"
					href={`/${lng}/contracts
					${`?q=${searchBoxText.trim()}`}
					${selectedCounty !== cities[0] ? `&county=${selectedCounty}` : ''}
					${urlParams.page > 1 ? `&page=${urlParams.page}` : ''}`}
				>
					<FontAwesomeIcon icon={faMagnifyingGlass} />
				</Link>
			</div>
			<div className="query-fun block h-8 w-full overflow-auto whitespace-nowrap align-middle md:w-1/3">
				<select
					className="country-tab-container h-full w-full list-none rounded-3xl border-whisper text-center"
					onChange={(e) => setSelectedCounty(e.target.value)}
					defaultValue={selectedCounty}
				>
					{cities.map((countyName) => {
						return (
							<option
								key={countyName}
								value={countyName}
								className="country-tab inline-block cursor-pointer px-2 text-center"
							>
								{countyName}
							</option>
						);
					})}
				</select>
			</div>
		</>
	);
}
