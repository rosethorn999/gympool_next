import Link from 'next/link';
import selections from '../../../../../public/selections.json';
import Image from 'next/image';
import ContractBox from '@/app/[lng]/components/ContractBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentSms, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faFacebookMessenger, faLine } from '@fortawesome/free-brands-svg-icons';
import { getContracts, getContract } from '@/app/apis/api';
import { Contract, Pagination } from '@/app/types/type';
import { useTranslation } from '@/app/i18n';
import { calcProductPrice } from '@/app/utils/contract';

export async function generateStaticParams() {
	const { results: contracts }: Pagination<Contract> = await getContracts({});
	const ids = contracts.map((o) => {
		return { id: o.id.toString() };
	});
	return ids;
}

export default async function Page({ params: { lng, id: recordId } }: any) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { t } = await useTranslation(lng, 'contracts');
	const contract: Contract = await getContract(recordId);
	const currency = 'NTD';
	const {
		title,
		gym_type,
		store,
		monthly_rental,
		county,
		district,
		modify_time,
		expiry_date,
		description,
		features,
		processing_fee,
		create_time,
		creator,
		inventory,
	} = contract;
	const { results: nearByContracts }: Pagination<Contract> = await getContracts({
		county: county,
		page_size: 4,
	});
	const selection = {
		gym_types: selections[0].list,
		features: selections[1].list,
	};
	const gym_typeCaption = (v: any) => {
		let selected = selection.gym_types.filter(function (item: any) {
			return item.val === v;
		});
		if (selected.length > 0) {
			return selected[0].name;
		} else {
			return t('invalid');
		}
	};
	return (
		<div className="recordDetail bg-white">
			<div className="h-full p-5 md:py-0">
				<div className="controller sticky top-[67px] z-10 cursor-pointer bg-white pb-6 pt-12">
					<Link href="/contracts">
						<FontAwesomeIcon icon={faArrowLeft} /> {t('Back')}
					</Link>
				</div>
				<div className="contract-container mb-24 md:mb-48">
					<div className="upper-box mb-24 flex w-full flex-col gap-4 md:flex-row md:gap-24">
						<div className="left-box flex w-full flex-col gap-4 md:w-2/5">
							<h1 className="mb-8 text-4xl font-bold">{title}</h1>
							<Image
								className="main-image w-full rounded-3xl border border-whisper"
								src="/500x300.png"
								alt="mainPic"
								width="500"
								height="300"
							/>
							<span className="text-persianRed">{inventory <= 0 && <p>{t('SoldOut')}</p>}</span>
							<div className="contacts-box flex flex-col gap-5">
								<p className="text-xl">{t('sellerInfo')}</p>
								<div>
									{t('creator')}:&nbsp;
									<Link className="text-dodgerBlue underline" href={`/${lng}/user/${creator.id}`}>
										{creator.first_name}
									</Link>
								</div>
								<div className="z-0 flex flex-wrap gap-2">
									<FontAwesomeIcon
										icon={faLine}
										className={`text-3xl ${
											creator.line_id
												? 'cursor-pointer opacity-70 hover:opacity-100'
												: 'opacity-20 hover:cursor-not-allowed'
										}`}
										title={`${t('lineIdPromote')}: ${creator.line_id}`}
									/>
									<Link
										href={`https://www.facebook.com/${creator.facebook_id}`}
										className={creator.facebook_id ? 'pointer-events-auto' : `pointer-events-none`}
									>
										<FontAwesomeIcon
											icon={faFacebookMessenger}
											className={`text-3xl ${
												creator.facebook_id
													? 'cursor-pointer opacity-70 hover:opacity-100'
													: 'opacity-20 hover:cursor-not-allowed'
											}`}
											title={creator.facebook_id}
										/>
									</Link>
									<Link
										href={`sms:+886${creator.mobile}&body=Ask from Gympool member`}
										className={creator.mobile ? 'pointer-events-auto' : `pointer-events-none`}
									>
										<FontAwesomeIcon
											icon={faCommentSms}
											className={`text-3xl ${
												creator.mobile
													? 'cursor-pointer opacity-70 hover:opacity-100'
													: 'opacity-20 hover:cursor-not-allowed'
											}`}
											title={creator.mobile}
										/>
									</Link>
									<Link
										href={`mailto:${creator.email}?subject=Ask from Gympool member`}
										className={creator.email ? 'pointer-events-auto' : `pointer-events-none`}
									>
										<FontAwesomeIcon
											icon={faEnvelope}
											className={`text-3xl ${
												creator.email
													? 'cursor-pointer opacity-70 hover:opacity-100'
													: 'opacity-20 hover:cursor-not-allowed'
											}`}
											title={creator.email}
										/>
									</Link>
								</div>
							</div>
						</div>
						<div className="right-box flex w-full flex-col gap-7 md:w-3/5">
							<div>
								<h5 className="text-lg font-medium">{t('storeName')}</h5>
								<h3 className="text-3xl font-medium">
									{gym_typeCaption(gym_type)} {store}
								</h3>
								<p className="text-lg">
									{county} {district}
								</p>
							</div>

							<div className="contract-date-block">
								<h5 className="text-lg font-medium">{t('expiryDate')}</h5>
								<h4 className="text-2xl">{expiry_date.slice(0, 10)}</h4>
								<p className="text-slateGrey">
									{t('createdDate')}: {create_time.slice(0, 19)}
								</p>
								<p className="text-slateGrey">
									{t('modifyTime')}: {modify_time?.slice(0, 19)}
								</p>
							</div>

							{/* <p>
								場館特色:{' '}
								{selection.features.map(
									(o) => features.some((f) => f === o.val) && <span key={o.val}>{o.name} </span>
								)}
							</p> */}
							<div className="contract-price">
								<h5 className="text-lg font-medium">{t('price')}</h5>
								<h6 className="blue text-3xl font-medium text-dodgerBlue">
									{currency} ${calcProductPrice(expiry_date, monthly_rental, processing_fee)}
								</h6>
								<p className="gray font-medium text-slateGrey">
									{t('monthlyRentalFee')}: ${monthly_rental}
								</p>
								<p className="gray font-medium text-slateGrey">
									{t('processingFee')}: ${processing_fee}
								</p>
							</div>
							<div className="rounded-3xl">
								<h5 className="text-lg font-medium">{t('description')}</h5>
								<div className={`h-36 overflow-auto  text-sm ${!description && 'h-14'}`}>
									{description || `(${t('empty')})`}
								</div>
							</div>
						</div>
					</div>
					<h2 className="mb-12 text-4xl">{t('nearby')}</h2>
					<div className="mb-8 flex flex-row flex-wrap justify-start gap-16">
						{nearByContracts.map((r: Contract, i: number) => {
							return (
								<div className="h-48 w-full md:w-80" key={r.id}>
									<Link href={`./${r.id}`}>
										<ContractBox lng={lng} r={r} fitXs={true} />
									</Link>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export const revalidate = 3600;
