'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { redirect } from 'next/navigation';
import Cookies from 'js-cookie';
import { languages } from '../../../i18n/settings';
import { useRouter } from 'next/navigation';
import gymPoolLogo from '../../../../../public/gymPoolLogo.svg';

export const HeaderBase = ({ t, lng }) => {
	const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
	const [search, setSearch] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState();
	const token = Cookies.get('token');
	const router = useRouter();

	useEffect(() => {
		setIsLoggedIn(!!token);
	}, []);
	// store.subscribe(() => {
	//   // When state will be updated(in our case, when items will be fetched),
	//   // we will update local component state and force component to re-render
	//   // with new data.
	//   setIsLoggedIn(store.getState().user.user);
	// });

	function clickLogout() {
		Cookies.remove('token');
		Cookies.remove('user');
		setIsLoggedIn(false);
		redirect(`/${lng}/`);
	}
	function clickLangSwitcher() {
		const switchToLang = languages[(languages.indexOf(lng) + 1) % languages.length];
		router.push(`/${switchToLang}/`);
	}
	function triggerMobileMenu(toStatus = false) {
		toStatus = !isMobileMenuOpened;
		setIsMobileMenuOpened(toStatus);
		if (toStatus) {
			document.querySelector('body').style.overflow = 'hidden';
		} else {
			document.querySelector('body').style.overflow = 'auto';
		}
	}
	function handleChange(event) {
		switch (event.target.name) {
			case 'search':
				setSearch(event.target.value.trim());
				break;
			default:
				break;
		}
	}

	return (
		<header className="sticky top-0 z-10 flex h-[67px] w-full overflow-hidden bg-white px-5 py-0 text-center text-sm md:columns-3 md:px-24">
			{/* Desktop view */}
			<div className="flex w-full columns-5">
				<div className="logo-area h-[67px] w-1/2 cursor-pointer columns-2 text-left text-2xl ease-in md:w-[300px] md:text-center">
					<Link href={`/${lng}/`} className="block h-full w-[300px]">
						<Image
							src={gymPoolLogo}
							width="180"
							height="180"
							id="brandIcon"
							alt="brandLogo"
							className="align-middle"
						/>
					</Link>
				</div>
				<div className="hidden md:inline-block md:w-2/5 md:text-left">
					<Link className="md:h-[67px] md:leading-[76px]" href={`/${lng}/records`}>
						{t('sell')}
					</Link>
				</div>
				<div className="md:text-r hidden md:inline-block md:h-[67px] md:w-1/4 md:leading-[76px]">
					<select className="search-select inline-block h-8 w-20 rounded-l-2xl border-none bg-white md:px-2 md:align-middle md:outline md:outline-1 md:outline-offset-0 md:outline-whisper md:focus-visible:md:outline-1">
						<option value="1">{t('title')}</option>
					</select>
					<input
						name="search"
						type="text"
						className="search-text-box box-border inline-block h-8 max-w-[calc(100%-10rem)] border-y border-l border-whisper p-1 align-middle md:w-[calc(100%-4rem)]"
						onChange={handleChange}
					/>
					<Link
						className="search-btn inline-block opacity-70 hover:opacity-100 md:h-8 md:w-16 md:rounded-r-2xl md:border-y md:border-r md:border-whisper md:bg-transparent md:p-0 md:text-center md:align-middle md:text-lg md:leading-8 md:text-nightRider"
						href={`/${lng}/records/?q=${search.trim()}`}
					>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</Link>
				</div>
				<div className="login-area hidden md:inline-block md:h-[67px] md:w-1/5 md:pr-2 md:text-right md:leading-[76px]">
					{isLoggedIn ? (
						<>
							<Link className="mx-2" href={`/${lng}/setting`}>
								{t('setting')}
							</Link>
							<span>|</span>
							<button className="mx-2" onClick={clickLogout}>
								{t('logOut')}
							</button>
						</>
					) : (
						<>
							<Link className="mx-2" href={`/${lng}/invitation`}>
								{t('register')}
							</Link>
							<span>|</span>
							<Link className="mx-2" href={`/${lng}/login`}>
								{t('logIn')}
							</Link>
						</>
					)}
					<span>|</span>
					<FontAwesomeIcon
						size="xl"
						icon={faLanguage}
						className="mx-2 cursor-pointer opacity-70 hover:opacity-100"
						onClick={clickLangSwitcher}
					/>
				</div>
			</div>

			{/* Mobile View */}
			<div
				className="mobile-menu-area absolute right-5 top-4 bg-white md:hidden"
				onClick={() => triggerMobileMenu}
			>
				<div className={`trigger-button`}>
					<p></p>
					<div
						className={`bar1 my-[6px] h-[3px] w-[35px] bg-black transition duration-300 ease-linear ${
							isMobileMenuOpened && 'translate-x-[1px] translate-y-[10px] -rotate-45'
						}`}
					></div>
					<div
						className={`bar2 my-[6px] h-[3px] w-[35px] bg-black transition duration-100 ease-linear ${
							isMobileMenuOpened && 'opacity-0'
						}`}
					></div>
					<div
						className={`bar3 my-[6px] h-[3px] w-[35px] bg-black transition duration-300 ease-linear ${
							isMobileMenuOpened && '-translate-y-[8px] translate-x-[0px] rotate-45'
						}`}
					></div>
				</div>
			</div>
			<div
				className={`overlay fixed left-0 top-[66px] z-10 h-0 w-full overflow-x-hidden bg-white duration-300 ease-out md:hidden  ${
					isMobileMenuOpened && 'h-full'
				}`}
			>
				<div
					className="overlay-content relative mt-7 w-full py-5 pl-5 text-left text-lg"
					onClick={() => triggerMobileMenu}
				>
					<ul>
						{isLoggedIn ? (
							<>
								<li className="leading-[3rem]">
									<Link href="/manage">管理後台</Link>
								</li>
								<li className="leading-[3rem]">
									<button onClick={clickLogout}>登出</button>
								</li>
							</>
						) : (
							<>
								<li className="leading-[3rem]">
									<Link href="invitation">註冊</Link>
								</li>
								<li className="leading-[3rem]">
									<Link href="login">登入</Link>
								</li>
							</>
						)}
						<li className="leading-[3rem]">
							<Link href="/records">會籍轉讓</Link>
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
};
