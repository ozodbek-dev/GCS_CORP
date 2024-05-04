import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { api } from "services";
import { TParams } from "services/types";

interface IPostOptions {
	url: string;
	data: any;
	params?: TParams | undefined;
	config?: AxiosRequestConfig;
}

export default function usePost<ReturnType>() {
	return useMutation({
		mutationFn: ({ url, data, config }: IPostOptions) => api.post<ReturnType>(url, data, config),
	});
}
