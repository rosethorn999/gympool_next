import Link from 'next/link';
import { useTranslation } from '../../i18n';

export default async function FooterBar({ lng }: { lng: string }) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { t } = await useTranslation(lng, 'footer');
	return (
		<footer className="FooterBar bg-codGrey text-white hover:text-white">
			<div className="footer-block min-h-[200px] w-full columns-1 flex-wrap justify-between p-7 px-[10vw] pt-7 text-left text-white md:columns-4">
				<div className="h-36">
					<p className="blue mx-0 my-2 text-summerSky">{t('about')}</p>
					<ul className="m-0 list-none p-0">
						<li>
							<Link
								href="/motivation"
								className="mb-2 text-sm leading-6 text-pattensBlue hover:text-white"
							>
								{t('motivation')}
							</Link>
						</li>
						{/* <li>
							<Link
								href="/success-story"
								className="mb-2 text-sm leading-6 text-pattensBlue hover:text-white"
							>
								{t('successStory')}
							</Link>
						</li> */}
					</ul>
				</div>
				<div className="h-36">
					<p className="blue mx-0 my-2 text-summerSky">{t('help')}</p>
					<ul className="m-0 list-none p-0">
						<li>
							<Link
								href="/faq"
								className="mb-2 text-sm leading-6 text-pattensBlue hover:text-white"
							>
								{t('FAQ')}
							</Link>
						</li>
						<li>
							<Link
								href="/privacy"
								className="mb-2 text-sm leading-6 text-pattensBlue hover:text-white"
							>
								{t('PrivacyPolicy')}
							</Link>
						</li>
						<li>
							<Link
								href="/terms"
								className="mb-2 text-sm leading-6 text-pattensBlue hover:text-white"
							>
								{t('TermsOfService')}
							</Link>
						</li>
					</ul>
				</div>
				<div className="fake hidden h-36 md:block"></div>
				<div className="fans-container h-36 text-center align-middle md:flex">
					<ul className="m-0 w-full list-none p-0">
						<li className="fans-club mb-2">
							<Link
								href="https://www.facebook.com/groups/1430635017257294"
								target="_blank"
								rel="noreferrer"
								className="border border-white px-6 py-2 text-pattensBlue hover:text-white"
							>
								{t('fanPage')}
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="flex h-28 items-center bg-blueCharcoal text-center">
				<p className="m-0 w-full text-xl leading-8 text-white md:h-16 md:leading-[66px]">
					2023 Copyright
				</p>
			</div>
		</footer>
	);
}
