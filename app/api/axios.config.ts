import axios from "axios";
import { HttpStatus } from "~/constants/http-status";
import { getLocalStorage, getTokens, removeLogInInfo } from "~/lib/utils";
import {
  getAndUpdateToken,
  isTokenExpired,
  onFailedCallStoreRequest,
  onSuccessCallStoreRequest,
  resetFailedRequests,
  storeFailedRequest,
} from "./api.actions";
import { Routes } from "~/constants/routes";
import { StorageKey } from "~/constants/storage-key";

export const BaseUrl =
  (import.meta.env.VITE_API_URL as string) || "http://localhost:5000";

export const defaultOptions = (baseURL: string) => ({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const publicClient = axios.create(defaultOptions(BaseUrl));
const Client = axios.create(defaultOptions(BaseUrl));

let isTokenRefreshing = false;

// Request interceptor to add token from cookies
Client.interceptors.request.use((config) => {
  const tokens = getTokens();
  if (tokens.accessToken) {
    config.headers["Authorization"] = `Bearer ${tokens.accessToken}`;
  }

  return config;
});

// Response interceptor to handle 401 errors and token refresh
Client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const originalRequest = error.config!;

    const tokens = getTokens();

    if (
      status === HttpStatus.unauthenticated ||
      isTokenExpired(tokens?.accessToken)
    ) {
      if (isTokenRefreshing) {
        return storeFailedRequest(error);
      }

      isTokenRefreshing = true;

      if (!tokens.refreshToken) {
        removeLogInInfo();
        window.location.href = Routes.HOME();
        return Promise.reject(error);
      }

      try {
        const userId = getLocalStorage<string | undefined>(StorageKey.userId);
        const getTokens = await getAndUpdateToken(userId);

        if (getTokens?.accessToken) {
          Client.defaults.headers[
            "Authorization"
          ] = `Bearer ${getTokens.accessToken}`;
        }

        onSuccessCallStoreRequest();
      } catch (catchError: any) {
        // eslint-disable-next-line no-console
        console.log("Logout from interceptor", catchError);
        onFailedCallStoreRequest();

        if (catchError?.response?.status === HttpStatus.unauthenticated) {
          removeLogInInfo();
          window.location.href = Routes.HOME();
        }

        return Promise.reject(error);
      } finally {
        resetFailedRequests();
        isTokenRefreshing = false;
      }
    } else {
      return Promise.reject(error);
    }

    return Client(originalRequest);
  }
);

export { Client, publicClient };
