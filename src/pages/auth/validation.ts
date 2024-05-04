import * as Yup from "yup";
export const AuthValidation = {
	register() {
		return Yup.object({
			email: Yup.string()
				.email("Email is Invalid")
				.required("Email is required"),
			name: Yup.string()
				.min(3, "Name must be at least 3 characters")
				.required("Name is required"),
			key: Yup.string()
				.min(3, "Key must be at least 3 characters")
				.required("Key is required")
				.max(20, "Key must be less or equal to 20 characters"),
			secret: Yup.string()
				.min(3, "Secret must be at least 3 characters")
				.required("Secret is required")
				.max(20, "Secret must be less or equal to 20 characters"),
		});
	},
};
