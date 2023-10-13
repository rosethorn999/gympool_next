'use client';
import { useTranslation } from '@/app/i18n/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function SettingLayout({
	children,
	params: { lng },
}: {
	children: React.ReactNode;
	params: any;
}) {
	const { t } = useTranslation(lng, 'setting');
	const pathname = usePathname();
	const sideMenus = ['my-contracts', 'new-contract', 'member'];
	return (
		<div className="flex flex-wrap p-4 md:min-h-[calc(100vh-250px)]">
			<div className="w-full md:w-1/6">
				<ul className="w-full text-center">
					{sideMenus.map((o) => (
						<li
							key={o}
							className={`mb-4 opacity-70 hover:opacity-100 ${
								pathname.includes(o) ? 'font-bold opacity-100' : ''
							}`}
						>
							<Link className="w-ful block" href={`/${lng}/setting/${o}`}>
								{t(o)}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div className="w-full md:w-5/6">
				<div className="container mx-auto">{children}</div>
			</div>
		</div>
	);
}
