import { useHooks } from "hooks/useHooks";
import useHttpRequest from "hooks/useHttpRequest";
import useModalStore from "hooks/useModalStore";
import useRefetchQuery from "hooks/useRefetchQueries";
import { IBookProps } from "pages/book/modals/edit-modal";
import { toast } from "react-toastify";
import { bookEndpoints } from "services/endpoints";

function useUpdateBook() {
	const { mutate, ...otherProps } = useHttpRequest();
	const { onModalClose, data } = useModalStore();
	const { get } = useHooks();
	const refetchAllBooks = useRefetchQuery(["GET_ALL_BOOKS"]);

	const onSubmit = (formData: IBookProps) => {
		mutate(
			{
				url: bookEndpoints.UPDATE(get(data, "id", "")),
        data: {
          book: formData,
          status:1,
        },
				method: "patch",
			},
			{
				onSuccess: () => {
					refetchAllBooks();
					onModalClose("updateBook");
					toast.success("Book Updated Successfully!");
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
	return { onSubmit, ...otherProps };
}

export default useUpdateBook;
