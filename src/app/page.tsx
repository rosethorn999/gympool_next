// import Image from 'next/image'
// import { useState } from "react";
// import { useRouter } from "next/router";
// import { HashRouter as Router, Link, useHistory } from "react-router-dom";
import Link from 'next/link';
// import Image from 'next/image';
import RecordBox from '../app/components/RecordBox';
// import basicRequest from '../app/apis/api';

interface ICountry {
	county: string;
	count: number;
}
interface IRecord {
	title: string;
	monthly_rental: Number;
	id: string;
}
declare global {
	interface Window {
		FB: any;
	}
}

function Home() {
	// function Home(props: { records: IRecord[]; countyScatter: ICountry[] }) {
	const records = [
		{ title: '111title', id: '12', monthly_rental: 899 },
		{ title: '222', id: '12312314', monthly_rental: 899 },
		{ title: '333', id: '12wgw24', monthly_rental: 899 },
		{ title: '444', id: '12wef24', monthly_rental: 899 },
		{ title: '555', id: 'few', monthly_rental: 899 },
		{ title: '666', id: 'fe412123w', monthly_rental: 899 },
	];
	const countyScatter = [
		{ county: '彰化縣', count: 40 },
		{ county: '高雄市', count: 40 },
		{ county: '臺東縣', count: 50 },
		{ county: '花蓮縣', count: 90 },
	];
	// const {
	// 	records = [
	// 		{ title: '111title', id: '12', monthly_rental: 899 },
	// 		{ title: '222', id: '12312314', monthly_rental: 899 },
	// 		{ title: '333', id: '12wgw24', monthly_rental: 899 },
	// 		{ title: '444', id: '12wef24', monthly_rental: 899 },
	// 		{ title: '555', id: 'few', monthly_rental: 899 },
	// 		{ title: '666', id: 'fe412123w', monthly_rental: 899 },
	// 	],
	// 	countyScatter = [
	// 		{ county: '彰化縣', count: 40 },
	// 		{ county: '高雄市', count: 40 },
	// 		{ county: '臺東縣', count: 50 },
	// 		{ county: '花蓮縣', count: 90 },
	// 	],
	// } = props;
	const borderColors = [
		'border-sunflower',
		'border-chestnut',
		'border-grassGreen',
		'border-dodgerBlue',
	];
	// readRecord();
	// getRecordByCounty();

	// const history = useHistory();
	// const [records, setRecords] = useState<IRecords[]>([]);
	// const [recordCount, setRecordCount] = useState(0);
	const recordCount = records.length;
	// const [countyScatter, setCountyScatter] = useState<ICountry[]>([]);

	function checkout(index: number) {
		let record = records[index];
		sessionStorage.setItem('record', JSON.stringify(record));
		let id = record.id;
		// history.push(`/recordDetail?recordId=${id}`);
	}

	return (
		<main className="w-full bg-white">
			<div className="relative flex h-[80vh] items-center justify-center text-center ">
				{/* <div className="w-full h-full"></div> */}
				<div className="absolute box-border w-full bg-white bg-cover bg-center after:block after:h-full after:w-full after:opacity-60">
					<p className="mb-4 mt-0 text-4xl">健身房會籍轉讓</p>
					<p className="mb-4 text-3xl">
						有
						<span className="mx-4 my-0 inline-block min-w-[80px] rounded bg-gympoolBlue text-3xl text-white">
							{recordCount}
						</span>
						件刊登商品
					</p>
					<p className="mb-4">尋找你所在的城市</p>
					<div className="p-2">
						<ul>
							{countyScatter.map((item: any, i) => {
								return (
									<li
										key={item.county}
										className={`m-5 mb-10 inline-block h-28 w-28 rounded-full border-2 pt-2 text-xl ${borderColors[i]}`}
									>
										<Link
											href={'/records?activeTab=' + item.county}
											className="leading-7 text-nightRider hover:text-gympoolBlue"
										>
											{item.county}
										</Link>
										<p className=" leading-7">{item.count.toString()}</p>
										<p className=" leading-7">件</p>
									</li>
								);
							})}
						</ul>
					</div>
					<p className="mb-4">
						檢視
						<Link href="/records" className=" text-grassGreen hover:text-gympoolBlue">
							全部商品
						</Link>
					</p>
				</div>
			</div>
			<div className="px-5 py-8 text-3xl md:py-24 md:text-2xl ">
				<h5 className="py-8">最新上架</h5>
				<div className="mb-8 flex flex-row flex-wrap justify-start gap-x-5 gap-y-10">
					{records.map((r: IRecord, i: number) => {
						return (
							<div className="h-48 w-full md:w-80" key={r.id}>
								<Link href={`records/${r.id}`}>
									<RecordBox
										r={r}
										fitXs={true}
										// handleClick={(o) => checkout(i)}
									/>
								</Link>
							</div>
						);
					})}
				</div>
				<div className="h-36 text-center text-lg leading-9">
					看
					<Link router-link="true" className="text-gympoolBlue" href="/records">
						更多選項
					</Link>
				</div>
			</div>
		</main>
	);
}

// export async function getStaticProps() {
//   const records = await readRecord();
//   const countyScatter = await getRecordByCounty();

//   function readRecord() {
//     const isMobileWidth = window.innerWidth <= 480;
//     let _page_size = isMobileWidth ? 7 : 15; // mobile show 7 items, pc 15 items
//     let url = "/record/?page_size=" + _page_size;
//     basicRequest.get(url).then((response: any) => {
//       const { count, results } = response.data;

//       // setRecordCount(count);
//       // setRecords(results);
//       resolve(results);
//     });
//   }
//   return {
//     props: {
//       records,
//       countyScatter,
//     },
//     revalidate: 60,
//   };
//   function getRecordByCounty() {
//     let url = "/group-by-county/";

//     basicRequest.get<IRecords[]>(url).then((response: any) => {
//       let list = response.data;
//       list.splice(4, list.length);
//       list.sort((a: any, b: any) => {
//         return b.count - a.count;
//       });
//       resolve(list);
//     });
//   }
// }
export default Home;
