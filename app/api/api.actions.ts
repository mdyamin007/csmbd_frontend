import { AxiosError } from "axios";
import { Client, publicClient } from "./axios.config";
import type { FailedRequests, QueryValueType } from "~/types/api.type";
import Endpoints from "./endpoints";
import { getTokens, parseJson, storeTokens } from "~/lib/utils";

export let failedRequests: FailedRequests[] = [];

export async function getNewToken(refreshToken: string) {
  const res = await publicClient.post(
    Endpoints.refresh(),
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}}`,
      },
    }
  );

  return res.data;
}

export const storeFailedRequest = (error: AxiosError) => {
  return new Promise((resolve, reject) => {
    failedRequests.push({
      resolve,
      reject,
      config: error.config!,
      error: error,
    });
  });
};

export function onSuccessCallStoreRequest() {
  if (failedRequests.length > 0) {
    failedRequests.forEach(({ resolve, reject, config }) => {
      Client(config)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
}

export function onFailedCallStoreRequest() {
  if (failedRequests.length > 0) {
    failedRequests.forEach(({ reject, error }) => reject(error));
  }
}

export function resetFailedRequests() {
  failedRequests = [];
}

export function isTokenExpired(token: string | undefined | null) {
  if (!token) return false;
  const expiry = parseJson(
    Buffer.from(token.split(".")[1], "base64").toString()
  )?.exp;

  return Math.floor(new Date().getTime() / 1000) >= expiry - 50;
}

export async function getAndUpdateToken(_userId: string | null | undefined) {
  const tokens = getTokens();
  if (tokens?.refreshToken) {
    const response = await getNewToken(tokens?.refreshToken);

    const { accessToken = null, refreshToken = null } = response?.data ?? {};

    if (!accessToken || !refreshToken) {
      throw new Error(
        "Something went wrong while refreshing your access token"
      );
    }

    storeTokens({
      accessToken,
      refreshToken,
    });

    return { accessToken, refreshToken };
  }
}

export const addQUeryParams = (url: string, queryValues: QueryValueType) => {
  const hasQusMarkUrl = url?.includes("?");
  let hasQusMarkInQueryString = false;

  let queryString = "";

  const queryArr = Object.entries(queryValues);

  queryArr.forEach(([queryKey, queryValue]) => {
    if (Array.isArray(queryValue) && queryValue.length > 0) {
      // If the queryValue is an array, loop through each value and append it with the same key
      queryValue.forEach((value) => {
        if (hasQusMarkUrl || hasQusMarkInQueryString) {
          queryString += `&${queryKey}=${value}`;
        } else {
          queryString += `?${queryKey}=${value}`;
          hasQusMarkInQueryString = true;
        }
      });
    } else if (
      queryValue !== "" ||
      queryValue !== undefined ||
      queryValue !== null ||
      !Number.isNaN(queryValue)
    ) {
      // For non-array values, append as usual
      if (hasQusMarkUrl || hasQusMarkInQueryString) {
        queryString += `&${queryKey}=${queryValue}`;
      } else {
        queryString += `?${queryKey}=${queryValue}`;
        hasQusMarkInQueryString = true;
      }
    }
  });

  return url + queryString;
};
