// import '../scss/RecordDetail.scss';
import Link from 'next/link';
import selections from '../../../../public/selections.json';
// import { HashRouter as Router, Link, useHistory } from 'react-router-dom';
import Image from 'next/image';
import RecordBox from '@/app/components/RecordBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faEnvelope } from '@fortawesome/free-regular-svg-icons';
interface IRecord {
	title: string;
	monthly_rental: Number;
	id: string;
}
function RecordDetail({ params }: any) {
	// const history = useHistory();
	// params.id;
	const records = [
		{ title: '111title', id: '12', monthly_rental: 899 },
		{ title: '222', id: '12312314', monthly_rental: 899 },
		{ title: '333', id: '12wgw24', monthly_rental: 899 },
		{ title: '444', id: '12wef24', monthly_rental: 899 },
		{ title: '555', id: 'few', monthly_rental: 899 },
		{ title: '666', id: 'fe412123w', monthly_rental: 899 },
	];
	let record: any = {
		title: 'Title title title123',
		gym_type: 1,
		store: '中正店',
		monthly_rental: 988,
		county: '基隆市',
		district: '七堵區',
		expiry_date: '2023-10-06',
		remark:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed risus nibh, hendrerit a eros vitae, dapibus lacinia augue. Maecenas egestas arcu sit amet ultricies tincidunt. Proin lacinia interdum odio vel porttitor. Vivamus mollis sollicitudin lectus, at venenatis leo sodales at. Fusce commodo vehicula tincidunt. Cras feugiat vestibulum ligula, dignissim condimentum orci. Donec elementum dignissim odio vel suscipit. Aenean id urna fermentum felis cursus aliquam nec vel orci. Proin consequat malesuada ex vel sagittis. Proin at laoreet tortor. Nunc tellus arcu, rutrum in odio sed, rutrum pellentesque mauris. Praesent elementum mi neque, eget sagittis dolor pulvinar nec. Nulla sodales pulvinar urna, vel blandit dolor. Integer imperdiet, orci id faucibus varius, mi libero congue est, nec mollis ante massa nec sapien. Nullam non lobortis lectus, non elementum metus. Vestibulum a lacus et purus bibendum vestibulum at eu enim. Etiam ex justo, molestie vel laoreet ac, luctus ac sapien. Sed non vestibulum leo, sed bibendum turpis. Aenean placerat pellentesque mi, sit amet tincidunt nulla tempor vel. Phasellus et aliquet ipsum. Curabitur posuere tincidunt tellus et iaculis. Aliquam erat volutpat. Vestibulum mi tortor, eleifend sed facilisis ut, consequat id mi. Sed quis finibus sem. Pellentesque sollicitudin tempor quam ut lacinia. Nunc feugiat fermentum felis, quis dapibus magna vulputate ut. Nullam vestibulum tortor lacus, quis hendrerit neque condimentum sed. Praesent consequat nisi ex, sed sodales nisl venenatis a. Maecenas pulvinar, lacus non dapibus faucibus, nisi nisl blandit metus, in tempor felis est commodo felis. Donec bibendum vitae dolor ac condimentum. Praesent aliquet luctus neque, quis malesuada arcu auctor et. Phasellus ac viverra purus. Aliquam elementum ultrices rhoncus. Sed efficitur nisl nec volutpat pulvinar. Sed suscipit in mi eu posuere. Proin sit amet arcu porta, tristique urna in, blandit ligula. Sed libero magna, dictum sit amet tellus condimentum, suscipit interdum lacus. Sed euismod, quam condimentum consectetur aliquam, lacus ante dignissim odio, a suscipit nunc orci sed mauris. Vestibulum interdum diam vel ornare condimentum. Cras suscipit nunc quis consequat finibus. Nunc vulputate, odio nec ornare rutrum, sem tellus posuere ante, eget pellentesque risus erat vel nunc. Curabitur eget sapien ut ligula condimentum aliquet id vitae nulla. Donec eu nibh vel erat porta laoreet id quis tortor. Curabitur enim risus, fermentum at dui non, fringilla tincidunt velit. Suspendisse hendrerit, velit at malesuada ullamcorper, diam nisl luctus est, ut faucibus purus leo non orci. Praesent blandit nulla nec risus iaculis lacinia. Donec ante nibh, condimentum in venenatis id, tempor eget mi. Quisque scelerisque odio vel ullamcorper congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed ac dapibus leo. Nullam quis enim a ipsum ullamcorper placerat. Etiam eros purus, interdum id dapibus in, lobortis eget lectus. Donec sodales odio nulla, quis pulvinar ante fringilla in. Proin vehicula quis sem ac congue. Phasellus eu purus et lorem tempor convallis. Donec facilisis consectetur eros, a scelerisque dolor ornare non. Pellentesque maximus arcu tincidunt aliquam convallis. Integer tristique lacus risus, eu commodo libero efficitur nec. Morbi et erat at est pellentesque mollis.',
		features: [1, 2],
		processing_fee: 300,
		create_time: '2023-01-21T09:08:06.704104Z',
		creator: 'Alex',
		inventory: 1,
	}; // sessionStorage.getItem('record') ? JSON.parse(sessionStorage.getItem('record')) : {};
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
	// const goBack = () => {
	// 	history.goBack();
	// };
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
					{/* FIXME: need to click twice */}
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
								<Link className="text-dodgerBlue" href={'#'}>
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
							<div className="remark p-4 text-sm ">{remark}d</div>
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
