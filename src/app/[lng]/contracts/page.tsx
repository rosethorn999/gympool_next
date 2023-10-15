// 'use client';
import React from 'react';
// import { useState, useEffect } from 'react';
import { ContractBox } from '../components/ContractBox';
import SearchBox from '../components/SearchBox';
import loadingGif from '../../../../public/loading.gif';
import { getContracts } from '../../apis/api';
import selections from '../../../../public/selections.json';
import zipCode from '../../../../public/twZipCode.json';
import Link from 'next/link';
import Image from 'next/image';
import { Contract } from '../../type/type';
import { useTranslation } from '../../i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrownOpen } from '@fortawesome/free-regular-svg-icons';

const Contract = async ({ params: { lng }, searchParams }: any) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { t } = await useTranslation(lng, 'contracts');
	const currentPage = Number(searchParams.page) || 1;
	const defaultPageSize = 10;
	// TODO: expiry_date is a key feature, should be set as order

	const { results: contracts, count: recordCount }: { results: Contract[]; count: number } =
		await getContracts({
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
		<div className="contracts h-full w-full p-5 md:py-0">
			<div className="list-header my-2 flex flex-row flex-wrap gap-2 md:my-14">
				<SearchBox lng={lng} />
			</div>
			<div className="contract-container flex flex-wrap gap-12">
				{contracts === null ? (
					<div>
						<Image src={loadingGif} alt="loading" />
					</div>
				) : null}

				{contracts?.length === 0 ? (
					<div className="w-full text-center">
						{t('empty')} <FontAwesomeIcon size="lg" icon={faFaceFrownOpen} />
					</div>
				) : (
					contracts?.map((r: Contract, i: number) => {
						return (
							<Link key={r.id} className="w-full" href={`/${lng}/contracts/${r.id}`}>
								<ContractBox r={r} lng={lng} />
							</Link>
						);
					})
				)}
				<div className="pagination-block mt-12 h-24 w-full text-center">
					<Link
						href={`/${lng}/contracts?page=${currentPage - 1}`}
						className={`pagination-btn mx-2 border border-whisper px-6 py-2 text-navyBlue opacity-70 hover:opacity-100 md:mx-12 ${
							currentPage <= 1 && 'pointer-events-none cursor-not-allowed'
						}`}
					>
						{t('prevPage')}
					</Link>
					<Link
						href={`/${lng}/contracts?page=${currentPage + 1}`}
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

export default Contract;
