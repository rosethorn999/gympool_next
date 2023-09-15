function Button(props) {
	return (
		<button
			className={`btn blue m-0 h-8 cursor-pointer rounded-2xl bg-dodgerBlue px-7 py-1 text-white hover:opacity-90 focus:outline-none active:border-none disabled:cursor-not-allowed disabled:opacity-60 ${
				props.color === 'pink' && 'bg-pink'
			}`}
			{...props}
		>
			{/* {JSON.stringify(props)} */}
			{props.children}
		</button>
	);
}

export default Button;
