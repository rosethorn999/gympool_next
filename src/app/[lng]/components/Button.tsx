import { MouseEventHandler } from 'react';

function Button({
	color = 'blue',
	disabled,
	onClick,
	children,
}: {
	color?: string;
	children: React.ReactNode;
	type?: string;
	disabled?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
	const colorMap: any = {
		blue: 'bg-dodgerBlue',
		pink: 'bg-pink',
		green: 'bg-grassGreen',
		red: 'bg-persianRed',
	};
	return (
		<button
			data-testid="button"
			className={`btn blue m-0 h-8 cursor-pointer rounded-3xl bg-dodgerBlue px-7 py-1 text-white hover:opacity-90 focus:outline-none active:border-none disabled:cursor-not-allowed disabled:opacity-60 ${colorMap[color]}`}
			disabled={disabled}
			onClick={onClick}
			// {...props}
		>
			{/* {JSON.stringify(props)} */}
			{children}
		</button>
	);
}

export default Button;
