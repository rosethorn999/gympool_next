import { useEffect, useState, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from '@/app/i18n/client';

type DatePickProps = {
	lng: string;
	isFullYYYY?: boolean;
	handleDateChange: Function;
	initValue?: string;
	isInvalid?: boolean;
};
function DatePick(props: DatePickProps) {
	const { lng, isFullYYYY = false, handleDateChange, initValue, isInvalid = false } = props;
	const { t } = useTranslation(lng, 'contracts');
	const isDebug = false;
	type TimeSelection = { yyyy: string[]; mm: string[]; dd: string[] };
	const defaultYYYY = '0000';
	const defaultMM = '00';
	const defaultDD = '00';

	const [yyyy, setYYYY] = useState(defaultYYYY);
	const [mm, setMM] = useState(defaultMM);
	const [dd, setDD] = useState(defaultDD);
	const [selection, setSelection] = useState<TimeSelection>({
		yyyy: [],
		mm: [],
		dd: [],
	});
	useEffect(() => {
		isDebug && console.log('initValue=', initValue);
		if (initValue) {
			const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
			const match = regex.exec(initValue.slice(0, 10));
			if (match && match.length >= 3) {
				const newYYYY = match[1];
				const newMM = match[2];
				const newDD = match[3];
				isDebug && console.log('yyyy=', yyyy, 'newYYYY=', newYYYY, 'defaultYYYY=', defaultYYYY);
				isDebug && console.log('mm=', mm, 'newMM=', newMM, 'defaultMM=', defaultMM);
				isDebug && console.log('dd=', dd, 'newDD=', newDD, 'defaultDD=', defaultDD);
				if (newYYYY !== yyyy && newYYYY !== defaultYYYY) {
					isDebug && console.log('trigger YYYY', newYYYY);
					setYYYY(newYYYY);
				}
				if (newMM !== mm && newMM !== defaultMM) {
					isDebug && console.log('trigger MM', newMM);
					setMM(newMM);
				}
				if (newDD !== dd && newDD !== defaultDD) {
					isDebug && console.log('trigger DD', newDD);
					setDD(newDD);
				}
			}
		}
	}, [initValue]);

	useEffect(() => {
		const v = `${[yyyy, mm, dd].join('-')}T00:00:00.000000Z`;

		handleDateChange && handleDateChange(v);
	}, [yyyy, mm, dd]);

	useEffect(() => {
		let today = new Date();
		let curYYYY = today.getFullYear();

		const ret: TimeSelection = { yyyy: [], mm: [], dd: [] };
		if (isFullYYYY) {
			for (let i = 0; i < 70; i++) {
				let v = (curYYYY - i).toString();
				ret.yyyy.push(v);
			}
		} else {
			for (let i = 0; i < 10; i++) {
				let v = (curYYYY + i).toString();
				ret.yyyy.push(v);
			}
		}
		for (let i = 1; i <= 12; i++) {
			let v = i.toFixed().padStart(2, '0');
			ret.mm.push(v);
		}
		for (let i = 1; i <= 31; i++) {
			let v = i.toFixed().padStart(2, '0');
			ret.dd.push(v);
		}

		setSelection(ret);
	}, []);
	function handleChange({ target: { value, name } }: ChangeEvent<HTMLSelectElement>) {
		// const val = event.target.value.trim()!;
		switch (name) {
			case 'yyyy':
				if (value !== yyyy) setYYYY(value.trim());
				break;
			case 'mm':
				if (value !== mm) setMM(value.trim());
				break;
			case 'dd':
				if (value !== dd) setDD(value.trim());
				break;
			default:
				break;
		}
	}
	return (
		<div className="DatePick flex w-full flex-col gap-2 md:flex-row">
			{/* <h1 className={`text-red-700 ${isDebug ? 'block' : 'hidden'}`}>
				{yyyy}
				{mm}
				{dd}
			</h1> */}
			<div className="w-full md:w-1/3">
				<select
					className={`yyyy h-10 w-full rounded-3xl border-2 bg-white px-2 text-center leading-10 ${
						isInvalid
							? 'border-bloodred focus:border-bloodredWith25Opacity'
							: 'border-whisper focus:border-mayaBlue'
					} `}
					name="yyyy"
					onChange={handleChange}
					value={yyyy}
				>
					<option value={defaultYYYY} disabled>
						{t('Year')}
					</option>
					{selection.yyyy.map((y) => (
						<option key={y} value={y}>
							{y}
						</option>
					))}
				</select>
			</div>
			<div className="w-full md:w-1/3">
				<select
					className={`mm h-10 w-full rounded-3xl border-2 bg-white px-2 text-center leading-10 ${
						isInvalid
							? 'border-bloodred focus:border-bloodredWith25Opacity'
							: 'border-whisper focus:border-mayaBlue'
					} `}
					name="mm"
					onChange={handleChange}
					value={mm}
				>
					<option value={defaultMM} disabled>
						{t('Month')}
					</option>
					{selection.mm.map((m) => (
						<option key={m} value={m}>
							{m}
						</option>
					))}
				</select>
			</div>
			<div className="w-full md:w-1/3">
				<select
					className={`dd h-10 w-full rounded-3xl border-2 bg-white px-2 text-center leading-10 ${
						isInvalid
							? 'border-bloodred focus:border-bloodredWith25Opacity'
							: 'border-whisper focus:border-mayaBlue'
					} `}
					name="dd"
					onChange={handleChange}
					value={dd}
				>
					<option value={defaultDD} disabled>
						{t('Date')}
					</option>
					{selection.dd.map((d) => (
						<option key={d} value={d}>
							{d}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}

DatePick.propTypes = {
	isFullYYYY: PropTypes.bool,
	handleDateChange: PropTypes.func,
};
export default DatePick;
