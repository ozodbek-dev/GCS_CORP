import useModalStore from "hooks/useModalStore";
import usePost from "hooks/usePost";
import useRefetchQuery from "hooks/useRefetchQueries";
import { get } from "lodash";
import { toast } from "react-toastify";
import { bookEndpoints } from "services/endpoints";

export default function useAddBook() {
	const { mutate, ...otherProps } = usePost();
	const refetchAllBooks = useRefetchQuery(["GET_ALL_BOOKS"]);
	const { onModalClose } = useModalStore();
	const onSubmit = (formData: { isbn: string }) => {
		mutate(
			{
				url: bookEndpoints.CREATE,
				data: formData,
			},
			{
				onSuccess: () => {
					refetchAllBooks();
					onModalClose("addBook");
					toast.success("Book Added Successfully!");
				},
				onError: error => {
					if (get(error, "response.data.message")) {
						toast.error(`Something Went wrong! Error: ${get(error, "response.data.message")}`);
					} else {
						toast.error(`Something Went wrong! Please Try again`);
						console.log(error);
					}
				},
			}
		);
	};

	return {
		onSubmit,
		...otherProps,
	};
}
