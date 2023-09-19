'use client';
import Image from 'next/image';
import { useState } from 'react';

function Spinner({ defaultState = false }: { defaultState?: boolean }) {
	const [isOpen, setIsOpen] = useState<boolean>(defaultState);
	return (
		<div
			className={`fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-persianRed ${
				isOpen ? 'block' : 'hidden'
			}`}
			id="react-spinner"
		>
			<Image src="/logo.svg" className="animate-bounce" width={200} height={200} alt="spinner" />
		</div>
	);
}

function trigger(options: any) {
	const isShow = options.isShow;
	if (isShow) {
		SetSpinnerOpen();
	} else {
		SetSpinnerClose();
	}
}
function SetSpinnerOpen() {
	let overlayDivOld = document.querySelector('#react-spinner');
	overlayDivOld?.classList.add('show');
	overlayDivOld?.classList.remove('hidden');
	document.body.style.overflowY = 'hidden';
}
function SetSpinnerClose() {
	let overlayDivOld = document.querySelector('#react-spinner');
	overlayDivOld?.classList.remove('show');
	overlayDivOld?.classList.add('hidden');
	document.body.style.overflowY = 'auto';
}

export { Spinner, SetSpinnerOpen, SetSpinnerClose, trigger };
export default Spinner;
