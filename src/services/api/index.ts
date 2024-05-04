import axios from "axios";
import { get } from "lodash";
import { IBodyType } from "services/types";
import { getCredentialsFromCoockies, saveCredentialsToCoockies } from "utils/auth.helper";
import md5Handler from "utils/md5-handler";

const protectedAPI = axios.create({
	baseURL: import.meta.env.VITE_ROOT_API,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 10000,
});

protectedAPI.interceptors.request.use(
	config => {
		// Accessing method and URL
		const { method, url } = config;
		// Accessing request body (if applicable)
		const body: IBodyType = config.data;

		if (!!getCredentialsFromCoockies().key && !!getCredentialsFromCoockies().secret) {
			config.headers["Key"] = getCredentialsFromCoockies().key;
			config.headers["Sign"] = md5Handler({
				url: url!,
				method: method!,
				body,
				secret: getCredentialsFromCoockies().secret as string,
			});
		}

		if (method?.toLocaleLowerCase() === "post" && Object.hasOwn(body, "key") && Object.hasOwn(body, "secret")) {
			const sign = md5Handler({ url: url!, method: method!, body, secret: get(body, "secret", "") });
			config.headers["Sign"] = sign;
			config.headers["Key"] = get(body, "key", "");
			saveCredentialsToCoockies(get(body, "secret", ""), get(body, "key", ""));
		}

		return config;
	},
	function(error) {
		return Promise.reject(error);
	}
);

export default protectedAPI;
