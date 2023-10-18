type TextBoxProps = {
	name: string;
	extraClass?: string;
	type?: string;
	placeholder: string;
	value: any;
	onChange: any;
	disabled?: boolean;
	isInvalid?: boolean;
};
function TextBox(props: TextBoxProps) {
	const {
		name,
		extraClass = '',
		type = 'text',
		placeholder,
		value,
		onChange,
		disabled,
		isInvalid = false,
	} = props;

	return (
		<input
			disabled={disabled}
			value={value}
			name={name}
			type={type}
			className={`text-box mx-auto my-0 h-10 w-full min-w-[250px] rounded-3xl border-2 p-5 leading-10 shadow-dodgerBlueWith25Opacity focus-visible:outline-none 
			${disabled ? 'cursor-not-allowed' : 'cursor-auto'} 
			${
				isInvalid
					? 'border-bloodred focus:border-bloodredWith25Opacity'
					: 'border-whisper focus:border-mayaBlue'
			} 
			${extraClass}`}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
}

export default TextBox;
