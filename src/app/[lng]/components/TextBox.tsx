interface ITextBox {
	name: string;
	extraClass?: string;
	type?: string;
	placeholder: string;
	value: any;
	onChange: any;
	disabled?: boolean;
}
function TextBox(props: ITextBox) {
	const { name, extraClass = '', type = 'text', placeholder, value, onChange, disabled } = props;

	return (
		<input
			disabled={disabled}
			value={value}
			name={name}
			type={type}
			className={`text-box mx-auto my-0 h-10 w-full min-w-[250px] rounded-3xl border-2 border-whisper p-5 leading-10 shadow-dodgerBlueWith25Opacity focus:border-mayaBlue focus-visible:outline-none ${
				disabled ? 'cursor-not-allowed' : 'cursor-auto'
			} ${extraClass}`}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
}

export default TextBox;
