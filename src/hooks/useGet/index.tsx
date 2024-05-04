import { QueryFunctionContext, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api } from "services";
import { TParams } from "services/types";

interface IQueryKeyArgs {
	url: string;
	params?: TParams | undefined;
}

interface IProps {
	name: string;
	url: string;
	onSuccess?: (data: unknown) => void;
	onError?: (error: unknown) => void;
	queryOptions?: UseQueryOptions<any, any, any, any>;
	params?: TParams | undefined;
}

async function fetch({ queryKey }: QueryFunctionContext<[string, IQueryKeyArgs]>) {
	const { url } = queryKey[1];
	const res = await api.get(url);
	return res.data;
}

export function useGet(args: IProps) {
	const { name, url, onSuccess, onError, queryOptions } = args;
	const data = useQuery({
		queryKey: [`${name}`, { url }],
		queryFn: fetch,
		onSuccess,
		onError,
		...queryOptions,
	});

	return data;
}
