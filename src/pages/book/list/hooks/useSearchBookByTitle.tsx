import { useGet } from "hooks/useGet";
import { bookEndpoints } from "services/endpoints";

function useSearchBookByTitle(searchText: string) {
	const response = useGet({
		name: "SEARCH_BOOK_BY_TITLE",
		url: `${bookEndpoints.LIST}/${searchText}`,
		onError: error => {
			console.log(error);
		},
	});

	return response;
}

export default useSearchBookByTitle;
