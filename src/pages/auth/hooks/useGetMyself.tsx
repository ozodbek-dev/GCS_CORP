import { useGet } from "hooks/useGet";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import { authEndpoints } from "services/endpoints";
import { getMe, logOut } from "store/auth";

export default function useGetMyself() {
  const dispatch = useDispatch();
	const response = useGet({
		name: "GET_MYSELF",
		url: authEndpoints.GET_MYSELF,
    onSuccess: data => {
			dispatch(
				getMe({
					data: {
						email: get(data, "data.email", ""),
						id: +get(data, "data.id", ""),
						name: get(data, "data.name", ""),
					},
					isLoggedIn: true,
				})
			);
		},
		onError: error => {
			dispatch(logOut());
			console.log(error);
		},
	});


	return response;
}
