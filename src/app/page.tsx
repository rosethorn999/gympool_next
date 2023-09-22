// import { useState } from "react";
import Link from 'next/link';
import RecordBox from '../app/components/RecordBox';
import { getRecords, getCountyScatter } from '../app/apis/api';
import { IRecord } from '../app/type/type';

declare global {
	interface Window {
		FB: any;
	}
}

async function Home() {
	const records = await getRecords({ county: '全部區域' });
	const countyScatter = await getCountyScatter();
	const borderColors = [
		'border-sunflower',
		'border-chestnut',
		'border-grassGreen',
		'border-dodgerBlue',
	];
	const recordCount = records.length;

	return (
		<main className="w-full bg-white">
			<div className="relative flex h-[80vh] items-center justify-center text-center ">
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
							{countyScatter.map((item: any, i: number) => {
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
									<RecordBox r={r} fitXs={true} />
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

export default Home;
