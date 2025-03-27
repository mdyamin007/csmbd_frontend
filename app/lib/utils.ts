import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CryptoJS from "crypto-js";
import type { TokenType } from "~/types/token.type";
import Cookies from "js-cookie";
import { StorageKey } from "~/constants/storage-key";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { ErrorType } from "~/types/error.type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

dayjs.extend(relativeTime);

const SECRET_ENCRYPTION_KEY =
  (import.meta.env.REACT_APP_SECRET_ENCRYPTION_KEY as string) ||
  "secret-encription-key";

// Encrypt tokens
export function encryptString(token: string): string {
  return CryptoJS.AES.encrypt(token, SECRET_ENCRYPTION_KEY).toString();
}

// Decrypt tokens
export function decryptString(encryptedToken: string): string | null {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_ENCRYPTION_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || null;
  } catch (error) {
    return null;
  }
}

export function storeTokens(params: TokenType) {
  if (!params.accessToken || !params.refreshToken) {
    // eslint-disable-next-line no-console
    console.warn("Access token and refresh token are required.");
    return;
  }

  try {
    const encryptedAccessToken = encryptString(params.accessToken);
    const encryptedRefreshToken = encryptString(params.refreshToken);

    Cookies.set(StorageKey.accessToken, encryptedAccessToken, {
      path: "/",
      secure: true,
      sameSite: "Strict",
      expires: 365 * 60 * 60 * 24,
      // HttpOnly: true,
    });
    Cookies.set(StorageKey.refreshToken, encryptedRefreshToken, {
      path: "/",
      secure: true,
      sameSite: "Strict",
      expires: 365 * 60 * 60 * 24,
      // HttpOnly: true,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error storing tokens:", error);
  }
}
export function getTokens() {
  const encryptedAccessToken = Cookies.get(StorageKey.accessToken);
  const encryptedRefreshToken = Cookies.get(StorageKey.refreshToken);

  const accessToken = encryptedAccessToken
    ? decryptString(encryptedAccessToken)
    : null;
  const refreshToken = encryptedRefreshToken
    ? decryptString(encryptedRefreshToken)
    : null;
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
}
export function removeTokens() {
  Cookies.remove(StorageKey.accessToken);
  Cookies.remove(StorageKey.refreshToken);
}

export function removeLogInInfo() {
  removeTokens();
  removeLocalStorage(StorageKey.redux);
}

export function parseJson(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return {};
  }
}

// Function to store data in localStorage
export function setLocalStorage<T>(key: string, value: T): void {
  const serializedValue = JSON.stringify(value);
  localStorage.setItem(key, serializedValue);
}

// Function to retrieve data from localStorage
export function getLocalStorage<T>(key: string): T | null {
  const serializedValue = localStorage.getItem(key);
  if (serializedValue) {
    return JSON.parse(serializedValue) as T;
  }
  return null;
}

export function removeLocalStorage(key: string): void {
  localStorage.removeItem(key);
}

export function errorResponseHandler(error: AxiosError<ErrorType, any>) {
  toast.error(error?.response?.data?.error || "Request failed!");
}
