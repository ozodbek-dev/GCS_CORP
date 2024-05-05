import { useMutation } from "@tanstack/react-query";
import { api } from "services";
interface IPostOptions {
	url: string;
}
export default function useDelete() {
	return useMutation({
		mutationFn: ({ url }: IPostOptions) => api.delete(url),
	});
}
