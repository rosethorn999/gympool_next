interface ITextBox {
	name: string;
	extraclass?: string;
	type?: string;
	placeholder: string;
	value: any;
	onChange: any;
}
function TextBox(props: ITextBox) {
	const { name, extraclass = '', type = 'text', placeholder, value, onChange } = props;

	return (
		<input
			{...props}
			value={value}
			name={name}
			type={type}
			className={`text-box mx-auto my-0 h-10 w-1/3 min-w-[250px] rounded-2xl border-2 border-whisper p-5 leading-10 shadow-dodgerBlueWith25Opacity focus:border-mayaBlue focus-visible:outline-none ${extraclass}`}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
}

export default TextBox;
