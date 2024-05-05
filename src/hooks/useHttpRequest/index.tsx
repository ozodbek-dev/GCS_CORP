import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { api } from "services";
import { TParams } from "services/types";
type TMethod = "get" | "post" | "put" | "patch" | "delete";

interface IPostOptions {
	url: string;
	data?: any;
	params?: TParams | undefined;
	config?: AxiosRequestConfig;
	method?: TMethod;
}

export default function useHttpRequest<ReturnType>() {
	return useMutation({
		mutationFn: ({ url, data, config, method = "post" }: IPostOptions) => {
			if (method === "delete") return api.delete(url, config);
			return api[method]<ReturnType>(url, data, config);
		},
	});
}
