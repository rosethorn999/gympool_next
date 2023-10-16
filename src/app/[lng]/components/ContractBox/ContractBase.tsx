import selections from '../../../../../public/selections.json';
import world_gym from '../../../../../public/world_gym.jpg';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { Contract } from '@/app/type/type';
import { faMessage, faEnvelope } from '@fortawesome/free-regular-svg-icons';

export const ContractBase = ({ t, fitXs, r }: { t: any; fitXs: boolean; r: Contract }) => {
	const {
		title,
		store,
		gym_type,
		expiry_date,
		monthly_rental,
		modify_time,
		view = 128,
		creator,
		processing_fee,
	} = r;
	const currency = 'NTD';
	const selection = {
		gym_types: selections[0].list,
	};
	const mm_yyyy = () => {
		let d = new Date(expiry_date);
		let yyyy = d.getFullYear();
		let mm = (d.getMonth() + 1).toFixed().padStart(2, '0');
		return `${mm}/${yyyy}`;
	};
	const mm_yyyy_modify_time = () => {
		let d = modify_time ? new Date(modify_time) : new Date();
		let yyyy = d.getFullYear();
		let mm = (d.getMonth() + 1).toFixed().padStart(2, '0');
		return `${mm}/${yyyy}`;
	};
	const gym_typeCaption = () => {
		let v = gym_type;
		let selected = selection.gym_types.filter(function (item) {
			return item.val === v;
		});
		if (selected.length > 0) {
			return selected[0].name;
		} else {
			return t('invalid');
		}
	};
	const price = () => {
		let d = new Date(expiry_date).getTime();
		let now = new Date().getTime();

		const monthCount = Math.round(Math.min(d - now, 0) / 1000 / 60 / 60 / 24 / 30);
		const v = monthCount > 0 ? monthly_rental * monthCount + processing_fee : 0;
		return v;
	};
	return (
		<div
			className={`contract-box box-border block h-full w-full cursor-pointer rounded-3xl bg-[linear-gradient(to_right,rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/world_gym.jpg')] bg-cover p-5 text-white opacity-90 hover:opacity-100 md:gap-5 ${
				fitXs ? 'xs' : 'md:flex md:bg-none md:py-0 md:text-black'
			}`}
			title={title}
		>
			<div
				className={`image-block hidden rounded-3xl md:block md:w-52 md:min-w-[220px] md:overflow-hidden md:border md:border-whisper ${
					fitXs ? 'md:hidden' : 'md:h-36 md:flex-none'
				}`}
			>
				<Image src={world_gym} width={200} alt="wg" className="h-full w-full" />
			</div>

			<div
				className={`text-box-left flex flex-wrap py-2 text-left md:gap-2 ${
					fitXs ? 'md:gap-0' : 'md:w-2/6 md:flex-auto'
				}`}
			>
				<div className="m-0 w-full overflow-hidden text-ellipsis whitespace-nowrap text-2xl md:text-xl">
					{title}
				</div>
				<div className="m-0 text-sm">
					{gym_typeCaption()} {store}
				</div>
				<div className={`hidden w-full text-sm md:block ${fitXs && 'md:hidden'}`}>
					{t('creator')}: {creator.first_name}
				</div>
				<div className={`hidden w-full flex-wrap gap-2 md:flex ${fitXs && 'md:hidden'}`}>
					<FontAwesomeIcon
						icon={faMessage}
						className={`cursor-pointer text-3xl ${creator.mobile ? '' : 'opacity-20'}`}
						title={creator.mobile}
					/>
					<FontAwesomeIcon
						icon={faEnvelope}
						className={`cursor-pointer text-3xl ${creator.email ? '' : 'opacity-20'}`}
						title={creator.email}
					/>
				</div>
			</div>
			<div
				className={`text-box-right flex flex-wrap py-2 text-right md:gap-2 ${
					fitXs ? 'md:gap-0' : 'md:w-3/6 md:flex-auto'
				}`}
			>
				<div className={`m-0 hidden w-full text-2xl md:block ${fitXs ? 'hidden md:hidden' : ''}`}>
					<span className={`${fitXs ? '' : 'md:text-dodgerBlue'}`}>
						{currency} ${price()}
					</span>
				</div>
				<div
					className={`w-full text-2xl md:text-slateGrey ${
						fitXs ? 'text-2xl md:text-2xl md:text-white' : 'md:text-base md:text-slateGrey'
					}`}
				>
					{currency} ${monthly_rental}&nbsp;{t('Monthly')}
				</div>
				<div className="w-full">
					<p className="m-0 text-sm">
						{t('expiryDate')}: {mm_yyyy()}
					</p>
					<div style={{ clear: 'both' }}></div>
				</div>
				<div className="w-full">
					<p className="m-0 text-sm">
						{t('updateDate')}: {mm_yyyy_modify_time()}
					</p>
					<div style={{ clear: 'both' }}></div>
				</div>
			</div>
			<div className={`view-count hidden text-sm`}>
				<FontAwesomeIcon icon={faEye} />
				&nbsp; {view}
			</div>
		</div>
	);
};

ContractBase.propTypes = {
	fitXs: PropTypes.bool,
	r: PropTypes.object,
	lng: PropTypes.string,
};
