// root html
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import HeaderBar from '@/app/components/HeaderBar';
import FooterBar from '@/app/components/FooterBar';
// import { Spinner } from './components/Spinner';

config.autoAddCss = false;
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'GymPool',
	description: 'GymPool app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<HeaderBar />
				<div className="flex min-h-[calc(100vh-250px)] ">
					<div className="w-1/6 bg-red-400">
						<div>我的拍賣</div>
						<div>新增商品</div>
						<div>會員中心</div>
					</div>
					<div className="w-auto bg-white">
						<div className="container mx-auto">{children}</div>
					</div>
				</div>
				<FooterBar />
			</body>
		</html>
	);
}
