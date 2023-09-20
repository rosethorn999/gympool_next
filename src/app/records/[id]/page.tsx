import Link from 'next/link';
import selections from '../../../../public/selections.json';
import Image from 'next/image';
import RecordBox from '@/app/components/RecordBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { getRecords, getRecord } from '@/app/apis/api';
import { IRecord } from '@/app/type/type';

async function RecordDetail({ params }: any) {
	const recordId = params.id;
	const records = await getRecords(); // TODO: get relate data
	const record = await getRecord(recordId);

	const {
		title,
		gym_type,
		store,
		monthly_rental,
		county,
		district,
		expiry_date,
		remark,
		features,
		processing_fee,
		create_time,
		creator,
		inventory,
	} = record;
	const selection = {
		gym_types: selections[0].list,
		features: selections[1].list,
	};
	const price = () => {
		let d = new Date(expiry_date).getTime();
		let now = new Date().getTime();

		const monthCount = Math.round((d - now) / 1000 / 60 / 60 / 24 / 30);
		return monthly_rental * monthCount + processing_fee;
	};
	const gym_typeCaption = (v: any) => {
		let selected = selection.gym_types.filter(function (item: any) {
			return item.val === v;
		});
		if (selected.length > 0) {
			return selected[0].name;
		} else {
			return '無法計算';
		}
	};
	return (
		<div className="recordDetail bg-white">
			<div className="h-full p-5 md:py-0">
				<div className="controller sticky top-14 cursor-pointer bg-white pb-6 pt-12">
					<Link href="/records">&larr; 回上一頁</Link>
				</div>
				<div className="record-container mb-24 md:mb-48">
					<div className="upper-box mb-24 w-full gap-4 md:flex">
						<div className="left-box md:w-1/2">
							<h1 className="text-4xl font-bold">{title}</h1>
							<Image
								className="main-image w-full rounded-lg border border-whisper"
								src="/500x300.png"
								alt="mainPic"
								width="500"
								height="300"
							/>
							<span className="text-persianRed">{inventory <= 0 && <p>已售出</p>}</span>
							<div className="contacts-box">
								<p className="text-xl">賣家資訊</p>
								<Link className="text-dodgerBlue" href={`/user/${creator}`}>
									{creator}
								</Link>
								<div className="flex flex-wrap gap-2">
									<FontAwesomeIcon icon={faMessage} className="cursor-pointer text-3xl" />
									<FontAwesomeIcon icon={faEnvelope} className="cursor-pointer text-3xl" />
								</div>
							</div>
						</div>
						<div className="right-box w-full md:w-1/2">
							<div className="mb-7">
								<h5 className="text-lg font-medium">店名</h5>
								<h3 className="text-3xl font-medium">
									{gym_typeCaption(gym_type)} {store}
								</h3>
								<p className="text-lg">
									{county}
									{district}
								</p>
							</div>

							<div className="record-date-block mb-7">
								<h5 className="text-lg font-medium">合約到期日</h5>
								<h4 className="text-2xl"> {expiry_date}</h4>
								<p className="text-lg">建立日期: {create_time}</p>
							</div>

							{/* <p>
								場館特色:{' '}
								{selection.features.map(
									(o) => features.some((f) => f === o.val) && <span key={o.val}>{o.name} </span>
								)}
							</p> */}
							<div className="record-price">
								<h5 className="text-lg font-medium">價格</h5>
								<h6 className="blue text-3xl font-medium text-dodgerBlue">NT ${price()}</h6>
								<p className="gray font-medium text-nightRider">月費: ${monthly_rental}/月</p>
								<p className="gray font-medium text-nightRider">轉讓費: ${processing_fee}</p>
							</div>
						</div>
					</div>
					<div className="bottom-box mb-24 w-full rounded border border-whisper ">
						<div className="header h-10 bg-whisper px-5 leading-10">備註</div>
						<div className="h-36 overflow-auto ">
							<div className="remark p-4 text-sm">{remark}</div>
						</div>
					</div>
					<h2 className="mb-12 text-4xl">附近其他的商品</h2>
					<div className="mb-8 flex flex-row flex-wrap justify-start gap-x-5 gap-y-10">
						{records.map((r: IRecord, i: number) => {
							return (
								<div className="h-48 w-full md:w-80" key={r.id}>
									<Link href={`./${r.id}`}>
										<RecordBox r={r} fitXs={true} />
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

export default RecordDetail;
