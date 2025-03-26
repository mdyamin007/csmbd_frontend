import type { UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import type { ErrorType } from "./error.type";

export type FailedRequests = {
  resolve: (value: AxiosResponse) => void;
  reject: (value: AxiosError) => void;
  config: AxiosRequestConfig;
  error: AxiosError;
};

export type QueryValueType = Record<
  string,
  string | number | boolean | string[] | number[] | undefined | null
>;

export type HTTPMutatingMethod = "POST" | "PUT" | "PATCH" | "DELETE";

export type MutateOptionsType<ResponseType, RequestType> = Omit<
  UseMutationOptions<ResponseType, AxiosError<ErrorType>, RequestType>,
  "mutationKey"
> & {
  params?: QueryValueType;
  protectedApi?: boolean;
};

export type UseMutateParamsType<RequestType, ResponseType> = {
  url: string;
  method: HTTPMutatingMethod;
  params?: QueryValueType;
  options?: MutateOptionsType<ResponseType, RequestType>;
};
