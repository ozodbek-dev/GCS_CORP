import { TextFieldProps } from "@mui/material/TextField";
import { ReactNode } from "react";

export type TextInputProps = {
	label: string;
	placeholder?: string;
	children?: ReactNode;
	type?: string;
	isRequired?: boolean;
} & TextFieldProps;
