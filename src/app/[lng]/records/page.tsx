// 'use client';
import React from 'react';
// import { useState, useEffect } from 'react';
import RecordBox from '../components/RecordBox';
import SearchBox from '../components/SearchBox';
import loadingGif from '../../../../public/loading.gif';
import { getRecords } from '../../apis/api';
import selections from '../../../../public/selections.json';
import zipCode from '../../../../public/twZipCode.json';
import Link from 'next/link';
import Image from 'next/image';
import { IRecord } from '../../type/type';
import { useTranslation } from '../../i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrownOpen } from '@fortawesome/free-regular-svg-icons';

const Record = async ({ params: { lng }, searchParams }: any) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { t } = await useTranslation(lng, 'records');
	const currentPage = Number(searchParams.page) || 1;
	const defaultPageSize = 10;
	// TODO: expiry_date is a key feature, should be set as order

	const { results: records, count: recordCount }: { results: IRecord[]; count: number } =
		await getRecords({
			page: currentPage,
			county: searchParams?.county,
			q: searchParams?.q,
		});
	const selection = {
		zipCode,
		gym_types: selections[0].list,
	};
	// useEffect(() => {
	// 	let ret: any[] = [];
	// 	let selectedDistricts = selection.zipCode.find((item: any) => item.name === filter.county);

	// 	if (selectedDistricts) {
	// 		ret = selectedDistricts.districts;
	// 	}
	// 	setDistricts(ret);
	// }, [filter.county, selection.zipCode]);

	// function handleFilterChange(event: any) {
	// 	setFilter({ ...filter, [event.target.name]: event.target.value });
	// }
	// function handleSorterChange(event: any) {
	// 	setOrdering({ ...ordering, [event.target.name]: event.target.value });
	// }

	return (
		<div className="records h-full w-full p-5 md:py-0">
			<div className="list-header my-2 flex flex-row flex-wrap gap-2 md:my-14">
				<SearchBox lng={lng} />
			</div>
			<div className="record-container flex flex-wrap gap-12">
				{records === null ? (
					<div>
						<Image src={loadingGif} alt="loading" />
					</div>
				) : null}

				{records?.length === 0 ? (
					<div className="w-full text-center">
						{t('empty')} <FontAwesomeIcon size="lg" icon={faFaceFrownOpen} />
					</div>
				) : (
					records?.map((r: any, i: number) => {
						return (
							<Link key={r.id} className="w-full" href={`/${lng}/records/${r.id}`}>
								<RecordBox r={r} lng={lng} />
							</Link>
						);
					})
				)}
				<div className="pagination-block mt-12 h-24 w-full text-center">
					<Link
						href={`/${lng}/records?page=${currentPage - 1}`}
						className={`pagination-btn mx-2 border border-whisper px-6 py-2 text-navyBlue opacity-70 hover:opacity-100 md:mx-12 ${
							currentPage <= 1 && 'pointer-events-none cursor-not-allowed'
						}`}
					>
						{t('prevPage')}
					</Link>
					<Link
						href={`/${lng}/records?page=${currentPage + 1}`}
						className={`pagination-btn mx-2 border border-whisper px-6 py-2 text-navyBlue opacity-70 hover:opacity-100 md:mx-12 ${
							currentPage * defaultPageSize > recordCount &&
							'pointer-events-none cursor-not-allowed'
						}`}
					>
						{t('nextPage')}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Record;
