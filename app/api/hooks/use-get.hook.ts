import { AxiosError } from "axios";
import { addQUeryParams } from "../api.actions";
import { Client, publicClient } from "../axios.config";
import type { QueryValueType } from "~/types/api.type";
import type { ErrorType } from "~/types/error.type";
import {
  useQuery,
  type UseQueryOptions,
  type QueryKey,
} from "@tanstack/react-query";

/**
 * Wrapper for GET request to the API using react-query
 *
 * @param url - API endpoint. i.e - /api/user/me
 * @param params - Optional search queries.
 * @param options - react-query options and
 *        @param protectedApi -flag to indicate authorization is required or not
 */
export type UseGetParamsType<ResponseType> = {
  url: string;
  queryKey?: QueryKey;
  params?: QueryValueType;
  options?: UseQueryOptions<ResponseType, AxiosError<ErrorType>> & {
    protectedApi?: boolean;
  };
};

export function useGet<ResponseType = Record<string, unknown>>({
  url,
  options,
  queryKey,
  params,
}: UseGetParamsType<ResponseType>) {
  const {
    protectedApi = true,
    retry,
    refetchOnWindowFocus,
    ...rest
  } = options ?? {};

  if (params) url = addQUeryParams(url, params);

  const baseUrl = protectedApi ? Client : publicClient;

  return useQuery<ResponseType, AxiosError<ErrorType>>({
    queryKey: queryKey ? queryKey : [url],
    queryFn: () =>
      baseUrl.get<ResponseType>(url).then((response) => response.data),
    retry: retry || 3,
    refetchOnWindowFocus: refetchOnWindowFocus || false,
    ...rest,
  });
}
