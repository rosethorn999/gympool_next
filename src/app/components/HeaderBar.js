'use client';
import Image from 'next/image';
// import "../scss/HeaderBar.scss";
import { useState } from 'react';
// import {
//   HashRouter as Router,
//   Link,
//   useLocation,
//   useHistory,
// } from "react-router-dom";
import Link from 'next/link';
// import { useDispatch } from "react-redux";
// import { logout } from "../store/user";
// import store from "../store/index";
// import logo from './../gymPoolLogo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
function HeaderBar() {
	// const dispatch = useDispatch();
	// const history = useHistory();
	// const { pathname } = useLocation();
	const [mobileOverlayHeight, setMobileOverlayHeight] = useState('');
	const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
	const [triggerButtonClass, setTriggerButtonClass] = useState('');
	const [search, setSearch] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	// const search = '';
	// const mobileOverlayHeight = '';
	// const triggerButtonClass = '';
	// const isLoggedIn = false;

	// store.subscribe(() => {
	//   // When state will be updated(in our case, when items will be fetched),
	//   // we will update local component state and force component to re-render
	//   // with new data.
	//   setIsLoggedIn(store.getState().user.user);
	// });

	// useEffect(() => {
	//   triggerMobileMenu(false);
	// }, [pathname]);

	function goIndex() {
		// history.push(`/`);
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}
	function goRecords() {
		let key = search.trim();
		if (key === '') return;
		// history.push(`/records?search=${search.trim()}`);
	}
	function clickLogout() {
		// dispatch(logout());
		// history.push("/");
	}
	function triggerMobileMenu(toStatus = false) {
		toStatus = !isMobileMenuOpened;
		setIsMobileMenuOpened(toStatus);
		if (toStatus) {
			setMobileOverlayHeight('h-full');
			setTriggerButtonClass('closed');
			document.querySelector('body').style.overflow = 'hidden';
		} else {
			setMobileOverlayHeight('');
			setTriggerButtonClass('');
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
		// <div className="HeaderBar">
		<header className="sticky top-0 z-10 flex h-[67px] w-full overflow-hidden bg-white px-5 py-0 text-center text-sm md:columns-3 md:px-24">
			<div className="flex w-full columns-5">
				<div className="logo-area h-[67px] w-1/2 cursor-pointer columns-2 text-left text-2xl ease-in md:w-[300px] md:text-center">
					<Link href="/" className="block h-full w-[300px]">
						<Image
							src="/gymPoolLogo.svg"
							width="180"
							height="180"
							id="brandIcon"
							alt="brandLogo"
							className="align-middle"
						/>
					</Link>
				</div>
				<div className="hidden md:inline-block md:w-2/5 md:text-left">
					<Link className="md:h-[67px] md:leading-[76px]" href="/records">
						會籍轉讓
					</Link>
				</div>
				<div className="md:text-r hidden md:inline-block md:h-[67px] md:w-1/4 md:leading-[76px]">
					<select className="search-select inline-block h-8 w-20 rounded-l-2xl border-none bg-white md:px-2 md:align-middle md:outline md:outline-1 md:outline-offset-0 md:outline-whisper md:focus-visible:md:outline-1">
						<option value="1">標題</option>
					</select>
					<input
						name="search"
						type="text"
						className="search-text-box box-border inline-block h-8 max-w-[calc(100%-10rem)] border-y border-l border-whisper p-1 align-middle md:w-[calc(100%-4rem)]"
						onChange={handleChange}
					/>
					<a
						className="search-btn inline-block md:h-8 md:w-16 md:rounded-r-2xl md:border-y md:border-r md:border-whisper md:bg-transparent md:p-0 md:text-center md:align-middle md:text-lg md:leading-8 md:text-nightRider"
						href={`/records?search=${search.trim()}`}
					>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</a>
				</div>
				<div className="login-area hidden md:inline-block md:h-[67px] md:w-1/5 md:pr-2 md:text-right md:leading-[76px]">
					{isLoggedIn ? (
						<>
							<Link className="mx-2" href="./manage">
								管理後台
							</Link>
							<span>|</span>
							<Link className="mx-2" href="/">
								登出
							</Link>
						</>
					) : (
						<>
							<Link className="mx-2" href="./invitation">
								註冊
							</Link>
							<span>|</span>
							<Link className="mx-2" href="/login">
								登入
							</Link>
						</>
					)}
				</div>
			</div>

			{/* Mobile View */}
			<div
				className="mobile-menu-area absolute right-5 top-4 bg-white md:hidden"
				onClick={(o) => triggerMobileMenu()}
			>
				<div className={`trigger-button ${triggerButtonClass}`}>
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
				className={`overlay fixed left-0 top-[66px] z-10 h-0 w-full overflow-x-hidden bg-white ease-in md:hidden ${
					isMobileMenuOpened && 'h-full'
				}`}
			>
				<div className="overlay-content relative mt-7 w-full py-5 pl-5 text-left text-lg">
					<ul>
						{isLoggedIn ? (
							<>
								<li className="leading-[3rem]">
									<Link href="/manage">管理後台</Link>
								</li>
								<li className="leading-[3rem]">
									<Link href="/">登出</Link>
									{/* TODO: logout */}
								</li>
							</>
						) : (
							<>
								<li className="leading-[3rem]">
									<Link href="invitation">註冊</Link>
								</li>
								<li className="leading-[3rem]">
									<Link href="login" className="">
										登入
									</Link>
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
		// </div>
	);
}

export default HeaderBar;
