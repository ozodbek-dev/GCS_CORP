import * as Yup from "yup";
export const EditValidation = {
	book() {
		return Yup.object({
			isbn: Yup.string()
				.required("ISBN is required")
				.min(3, "Field must be at least 3 characters"),
			author: Yup.string()
				.min(3, "Field must be at least 3 characters")
				.required("Field is required"),
			pages: Yup.number().required("Field is required"),
			title: Yup.string()
				.min(3, "Field must be at least 3 characters")
				.required("Field is required"),
			published: Yup.number().required("Field is required"),
		});
	},
};
