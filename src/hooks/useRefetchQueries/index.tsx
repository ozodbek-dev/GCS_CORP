import { useQueryClient } from "@tanstack/react-query"

export default function useRefetchQuery(keys: any[]) {
  const queryClient = useQueryClient();
  return () => queryClient.refetchQueries(keys)
}
