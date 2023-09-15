interface ITextBox {
	name: string;
	extraClass: string;
	type?: string;
	placeholder: string;
	value: any;
	onChange: any;
}
function TextBox(props: ITextBox) {
	const { name, extraClass, type = 'text', placeholder, value, onChange } = props;

	return (
		<input
			{...props}
			value={value}
			name={name}
			type={type}
			className={`text-box mx-auto my-0 h-10 w-1/3 min-w-[250px] rounded-2xl border-2 border-whisper p-5 leading-10 shadow-dodgerBlueWith25Opacity focus:border-mayaBlue focus-visible:outline-none ${extraClass}`}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
}

export default TextBox;
