import { MouseEventHandler } from 'react';

function Button(props: {
	color?: string;
	children: any;
	type?: string;
	disabled?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
	return (
		<button
			className={`btn blue m-0 h-8 cursor-pointer rounded-3xl bg-dodgerBlue px-7 py-1 text-white hover:opacity-90 focus:outline-none active:border-none disabled:cursor-not-allowed disabled:opacity-60 ${
				props.color === 'pink' && 'bg-pink'
			}`}
			disabled={props.disabled}
			onClick={props.onClick}
			// {...props}
		>
			{/* {JSON.stringify(props)} */}
			{props.children}
		</button>
	);
}

export default Button;
