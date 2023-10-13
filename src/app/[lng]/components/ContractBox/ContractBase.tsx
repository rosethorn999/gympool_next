import selections from '../../../../../public/selections.json';
import world_gym from '../../../../../public/world_gym.jpg';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

export const ContractBase = ({ t, fitXs, r }: any) => {
	const {
		title,
		store,
		gym_type,
		expiry_date,
		monthly_rental,
		modify_time,
		view = 128,
		description,
		creator,
	} = r;
	const currency = 'NTD';
	const selection = {
		gym_types: selections[0].list,
	};
	const mm_yyyy = () => {
		let d = new Date(expiry_date);
		let yyyy = d.getFullYear();
		let mm = (d.getMonth() + 1).toFixed().padStart(2, '0');
		return `${mm}${t('month')}/${yyyy}`;
	};
	const mm_yyyy_modify_time = () => {
		let d = new Date(modify_time);
		let yyyy = d.getFullYear();
		let mm = (d.getMonth() + 1).toFixed().padStart(2, '0');
		return `${mm}${t('month')}/${yyyy}`;
	};
	const gym_typeCaption = () => {
		let v = gym_type;
		let selected = selection.gym_types.filter(function (item) {
			return item.val === v;
		});
		if (selected.length > 0) {
			return selected[0].name;
		} else {
			return '無法計算';
		}
	};
	const max30Chr = (v: string) => {
		if (v && v.length > 27) {
			return v.substring(0, 27) + '...';
		}
		return v;
	};
	return (
		<div
			className={`contract-box box-border block h-full w-full cursor-pointer rounded-xl bg-[linear-gradient(to_right,rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/world_gym.jpg')] bg-cover p-5 text-white opacity-90 hover:opacity-100 md:gap-5 ${
				fitXs ? 'xs' : 'md:flex md:bg-none md:py-0 md:text-black'
			}`}
		>
			<div
				className={`image-block hidden rounded-lg md:block md:w-52 md:min-w-[220px] md:overflow-hidden md:border md:border-whisper ${
					fitXs ? 'md:hidden' : 'md:h-36 md:flex-none'
				}`}
			>
				<Image src={world_gym} width={200} alt="wg" className="h-full w-full" />
			</div>

			<div className={`text-box-left text-left md:py-2 ${fitXs ? '' : 'md:w-2/6 md:flex-auto'}`}>
				<p className="m-0 text-2xl md:text-xl">{title}</p>
				<p className="m-0 text-sm">
					{gym_typeCaption()} {store}
				</p>
				<p
					id="description"
					className={`m-0 hidden text-sm text-charcoal md:block ${fitXs && 'md:hidden'}`}
				>
					{max30Chr(description)}
				</p>
				<p className={`hidden text-sm md:block ${fitXs && 'md:hidden'}`}>
					{t('creator')}: {creator}
				</p>
			</div>
			<div className={`text-box-right text-right md:py-2 ${fitXs ? '' : 'md:w-3/6 md:flex-auto'}`}>
				<p className="m-0 text-2xl">
					<span className={`${fitXs ? '' : 'md:text-dodgerBlue'}`}>
						{currency} ${monthly_rental}
					</span>{' '}
					{t('monthly')}
				</p>
				<div>
					<p className="m-0 text-sm">
						{t('expiryDate')}: {mm_yyyy()}
					</p>
					<div style={{ clear: 'both' }}></div>
				</div>
				<div>
					<p className="m-0 text-sm">
						{t('updateDate')}: {mm_yyyy_modify_time()}
					</p>
					<div style={{ clear: 'both' }}></div>
				</div>
			</div>
			<div className={`view-count text-sm ${fitXs ? 'hidden' : 'md:hidden'}`}>
				<FontAwesomeIcon icon={faEye} />
				&nbsp; {view}
			</div>
		</div>
	);
};

ContractBase.propTypes = {
	fitXs: PropTypes.bool,
	r: PropTypes.object,
	t: PropTypes.func,
};
