import type { UseMutateParamsType } from "~/types/api.type";
import { addQUeryParams } from "../api.actions";
import { Client, publicClient } from "../axios.config";
import { useMutation as useReactMutation } from "@tanstack/react-query";

/**
 * Wrapper for mutating requests to the API.
 *
 * Provides way to mutate remote data by trigger function.
 *
 * @template RequestType - Type of the request payload
 * @template ResponseType - Type of the server response
 * @param url - API endpoint. i.e - /api/user/me
 * @param method - HTTP method
 * @param [options] - React-query config
 */

export function useMutation<
  RequestType = Record<string, unknown>,
  ResponseType = Record<string, unknown>
>({ url, method, options }: UseMutateParamsType<RequestType, ResponseType>) {
  const { params = {}, protectedApi = true, ...rest } = options ?? {};

  if (params) url = addQUeryParams(url, params);

  return useReactMutation({
    mutationFn: (data) =>
      (protectedApi ? Client : publicClient)
        .request<ResponseType>({
          url,
          method,
          data,
          headers: {
            "Content-Type":
              data instanceof FormData
                ? "multipart/form-data"
                : "application/json",
          },
        })
        .then((response) => response.data),
    ...rest,
  });
}
