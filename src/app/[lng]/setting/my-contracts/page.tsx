'use client';
import Image from 'next/image';
import loadingGif from '../../../../../public/loading.gif';
import { Contract } from '@/app/type/type';
import { getMyContracts } from '@/app/apis/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrownOpen } from '@fortawesome/free-regular-svg-icons';
import { ContractBox } from '../../components/ContractBox/client';
import Link from 'next/link';
import { useTranslation } from '@/app/i18n/client';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Page({ params: { lng }, searchParams }: any) {
	const { t } = useTranslation(lng, 'setting');
	const user_id = Cookies.get('user_id') as string;

	const [contracts, setContracts] = useState<Contract[]>([]);
	const getMyContractsRequest = async (abortController: AbortController) => {
		const payload = { page: 1, user_id };
		const results = await getMyContracts(payload, abortController);
		setContracts(results);
	};
	useEffect(() => {
		const abortController = new AbortController();
		getMyContractsRequest(abortController);

		return () => abortController.abort();
	}, []);

	return (
		<>
			<div className="contract-container flex flex-wrap gap-12">
				{contracts === null ? (
					<div>
						<Image src={loadingGif} alt="loading" />
					</div>
				) : null}

				{!contracts || contracts?.length === 0 ? (
					<div className="w-full text-center">
						{t('empty')} <FontAwesomeIcon size="lg" icon={faFaceFrownOpen} />
					</div>
				) : (
					<>
						{contracts?.map((r: any, i: number) => {
							return (
								<Link key={r.id} className="w-full" href={`/${lng}/contracts/${r.id}/update`}>
									<ContractBox r={r} lng={lng} />
								</Link>
							);
						})}
						<div className="w-full text-center italic">{t('onlyShowFirst10Contracts')}</div>
					</>
				)}
			</div>
		</>
	);
}
