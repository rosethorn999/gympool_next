// root html
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import HeaderBar from './components/HeaderBar';
import FooterBar from './components/FooterBar';

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
				<div className="min-h-[calc(100vh-250px)] w-full bg-white">
					<div className="container mx-auto">{children}</div>
				</div>
				<FooterBar />
			</body>
		</html>
	);
}
