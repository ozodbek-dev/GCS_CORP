import { useGet } from "hooks/useGet";
import { toast } from "react-toastify";
import { bookEndpoints } from "services/endpoints";

export default function useGetAllBooks() {
	const response = useGet({
		name: "GET_ALL_BOOKS",
		url: bookEndpoints.LIST,
		onError: error => {
			toast.error(`Something Went wrong! Please Try again`);
			console.log(error);
		},
	});

	return response;
}
