import { useQueryClient } from "@tanstack/react-query";
import lodash from "lodash";
import qs from "qs";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const useHooks = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch()
	const location = useLocation();
	const params = useParams();
	const query = qs.parse(location.search, { ignoreQueryPrefix: true });
	const navigate = useNavigate();

	return {
		query,
		location,
		params,
		navigate,
		qs,
    queryClient,
    dispatch,
		...lodash,
	};
};

