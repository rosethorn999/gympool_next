// import "../scss/RecordBox.scss";
import selections from '../../../public/selections.json';
import world_gym from '../../../public/world_gym.jpg';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

function RecordBox(props) {
	const { fitXs, handleClick } = props;
	const {
		title,
		store,
		gym_type,
		expiry_date,
		monthly_rental,
		modify_time,
		view = 128,
		remark,
		creator,
	} = props.r;
	const selection = {
		gym_types: selections[0].list,
	};
	const yyyy_mm = () => {
		let d = new Date(expiry_date);
		let yyyy = d.getFullYear();
		let mm = d.getMonth() + 1;
		return yyyy + '/' + mm + '月';
	};
	const yyyy_mm_modify_time = () => {
		let d = new Date(modify_time);
		let yyyy = d.getFullYear();
		let mm = d.getMonth() + 1;
		return yyyy + '/' + mm + '月';
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
	const max30Chr = (v) => {
		if (v && v.length > 27) {
			return v.substr(0, 27) + '...';
		}
		return v;
	};
	return (
		<div
			className={`record-box box-border block w-full cursor-pointer rounded-xl bg-[linear-gradient(to_right,rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/world_gym.jpg')] bg-cover p-5 text-white opacity-90 hover:opacity-100 md:gap-2 ${
				fitXs ? 'xs' : 'md:flex md:bg-none md:py-0 md:text-black'
			}`}
			onClick={handleClick}
		>
			<div
				className={`image-block hidden rounded-lg md:block md:w-28 md:min-w-[150px] md:overflow-hidden md:border md:border-whisper ${
					fitXs ? 'md:hidden' : 'md:h-full md:flex-none'
				}`}
			>
				<Image src={world_gym} alt="wg" className="h-full w-full" />
			</div>

			<div className={`text-box-left text-left ${fitXs ? '' : 'md:w-2/6 md:flex-auto'}`}>
				<p className="m-0 text-2xl leading-6 md:text-xl md:leading-5">{title}</p>
				<p className="m-0 text-sm leading-6 md:leading-5">
					{gym_typeCaption()} {store}
				</p>
				<p
					id="remark"
					className={`m-0 hidden text-sm leading-6 text-charcoal md:block md:leading-4 ${
						fitXs && 'none'
					}`}
				>
					{max30Chr(remark)}
				</p>
				<p className={` hidden text-sm ${fitXs ? 'hidden' : 'md:block'}`}>刊登會員：{creator}</p>
			</div>
			<div className={`text-box-right text-right ${fitXs ? '' : 'md:w-3/6 md:flex-auto'}`}>
				<p className="m-0 text-2xl leading-6 md:leading-8">NTD ${monthly_rental} / 月</p>
				<div>
					<p className="m-0 text-sm leading-6 md:leading-8">到期日期: {yyyy_mm()}</p>
					<div style={{ clear: 'both' }}></div>
				</div>
				<div>
					<p className="m-0 text-sm leading-6 md:leading-8">更新日期: {yyyy_mm_modify_time()}</p>
					<div style={{ clear: 'both' }}></div>
				</div>
			</div>
			<div className={`view-count text-sm ${fitXs ? 'none' : 'md:hidden'}`}>
				<FontAwesomeIcon icon={faEye} />
				&nbsp; {view}
			</div>
		</div>
	);
}

RecordBox.defaultProps = {
	fitXs: false,
	r: {
		title: '',
		store: '',
		gym_type: 1,
		expiry_date: '',
		monthly_rental: '',
		processing_fee: '',
		remark: '',
		view: 0,
	},
};
RecordBox.propTypes = {
	handleClick: PropTypes.func,
	fitXs: PropTypes.bool,
	r: PropTypes.object,
};
export default RecordBox;
