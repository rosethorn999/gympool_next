import Link from 'next/link';
import ContractBox from './components/ContractBox';
import { getContracts, getCountyScatter } from '../../app/apis/api';
import { IContract } from '../../app/type/type';
import { useTranslation } from '../i18n';

declare global {
	interface Window {
		FB: any;
	}
}

const Page = async ({ params: { lng } }: any) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { t } = await useTranslation(lng);
	// // const isMobileWidth = window.innerWidth <= 480;
	// const _page_size = 15; // isMobileWidth ? 7 : 15; // mobile show 7 items, pc 15 items
	const { results: contracts, count: recordCount }: { count: number; results: IContract[] } =
		await getContracts({
			page_size: 10,
			county: '全部區域',
		});
	const countyScatter = await getCountyScatter();
	const borderColors = [
		'border-sunflower',
		'border-chestnut',
		'border-grassGreen',
		'border-dodgerBlue',
	];

	return (
		<main className="w-full bg-white">
			<div className="relative flex h-[80vh] items-center justify-center text-center ">
				<div className="absolute box-border w-full bg-white bg-cover bg-center after:block after:h-full after:w-full after:opacity-60">
					<p className="mb-4 mt-0 text-4xl">{t('GymContractReSell')}</p>
					<p className="mb-4 text-3xl">
						{t('hereAre')}
						<span className="mx-4 my-0 inline-block min-w-[80px] rounded bg-gympoolBlue text-3xl text-white">
							{recordCount}
						</span>
						{t('listedItems')}
					</p>
					<p className="mb-4">{t('findItemYouLocated')}</p>
					<div className="p-2">
						<ul>
							{countyScatter.map((item: any, i: number) => {
								return (
									<li
										key={item.county}
										className={`m-5 mb-10 inline-block h-28 w-28 rounded-full border-2 pt-2 text-xl ${borderColors[i]}`}
									>
										<Link
											href={`/${lng}/contracts?county=${item.county}`}
											className="leading-7 text-nightRider hover:text-gympoolBlue"
										>
											{t(item.county)}
										</Link>
										<p className=" leading-7">{item.count.toString()}</p>
										<p className=" leading-7">{t('items')}</p>
									</li>
								);
							})}
						</ul>
					</div>
					<p className="mb-4">
						{t('browse')}&nbsp;
						<Link href={`/${lng}/contracts`} className=" text-grassGreen hover:text-gympoolBlue">
							{t('allItems')}
						</Link>
					</p>
				</div>
			</div>
			<div className="px-5 py-8 text-3xl md:py-24 md:text-2xl ">
				<h5 className="py-8">{t('newArrivals')}</h5>
				<div className="mb-8 flex flex-row flex-wrap justify-start gap-x-5 gap-y-10">
					{contracts.map((r: IContract, i: number) => {
						return (
							<div className="h-48 w-full md:w-80" key={r.id}>
								<Link href={`contracts/${r.id}`}>
									<ContractBox r={r} fitXs={true} />
								</Link>
							</div>
						);
					})}
				</div>
				<div className="h-36 text-center text-lg leading-9">
					{t('browse')}&nbsp;
					<Link router-link="true" className="text-gympoolBlue" href={`/${lng}/contracts`}>
						{t('allItems')}
					</Link>
				</div>
			</div>
		</main>
	);
};

export default Page;
