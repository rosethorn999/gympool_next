// root html
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { HeaderBar } from './components/HeaderBar/client';
import FooterBar from './components/FooterBar';
import { Spinner } from './components/Spinner';
import { dir } from 'i18next';
import { languages } from '../i18n/settings';
import { ReCaptchaProvider } from 'next-recaptcha-v3';

export async function generateStaticParams() {
	return languages.map((lng: string) => ({ lng }));
}

config.autoAddCss = false;
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'GymPool',
	description: 'GymPool app',
};

export default function RootLayout({
	children,
	params: { lng },
}: {
	children: React.ReactNode;
	params: any;
}) {
	return (
		<html lang={lng} dir={dir(lng)}>
			<body className={inter.className}>
				<ReCaptchaProvider>
					<Spinner />
					<HeaderBar lng={lng} />
					<div className="min-h-[calc(100vh-250px)] w-full bg-white">
						<div className="container mx-auto">{children}</div>
					</div>
					<FooterBar lng={lng} />
				</ReCaptchaProvider>
			</body>
		</html>
	);
}
