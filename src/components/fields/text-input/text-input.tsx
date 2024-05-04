import { FormControl, FormHelperText, TextField } from "@mui/material";

import { ErrorMessage, FieldHookConfig, useField } from "formik";
import { TextInputProps } from "./text-input.props";

const TextInput = ({
	label,
	placeholder,
	isRequired,
	disabled,
	children,
	InputProps,
	size='small',
	type = "text",
	...props
}: TextInputProps & FieldHookConfig<string>): JSX.Element => {
	const [field, meta] = useField(props);
	return (
		<FormControl className='w-full' error={!!meta.touched && !!meta.error}>
			<TextField
				error={!!meta.touched && !!meta.error}
				label={label}
				required={isRequired}
				size={size}
				id={field.name}
				type={type}
				placeholder={placeholder}
				disabled={disabled}
				{...field}
				InputProps={InputProps}
			/>
			{children}
			<FormHelperText error={!!meta.touched && !!meta.error}>
				<ErrorMessage name={field.name} />
			</FormHelperText>
		</FormControl>
	);
};

export default TextInput;
