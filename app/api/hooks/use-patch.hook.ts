import type { UseMutateParamsType } from "~/types/api.type";
import { useMutation } from "./use-mutation.hook";

/**
 * Wrapper for PATCH request to the API.
 *
 * Provides way to mutate remote data by trigger function.
 *
 * @template RequestType - Type of the request payload
 * @template ResponseType - Type of the server response
 * @param url - API endpoint. i.e - /api/user/me
 * @param params Optional search queries
 * @param method - HTTP method
 * @param [options] - React-query config
 */
export function usePatch<
  RequestType = Record<string, unknown>,
  ResponseType = Record<string, unknown>
>(
  mutateOption: Omit<UseMutateParamsType<RequestType, ResponseType>, "method">
) {
  return useMutation<RequestType, ResponseType>({
    ...mutateOption,
    method: "PATCH",
  });
}
