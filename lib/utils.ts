import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface UrlQueryParams {
  params: string;
  key1: string;
  value1: string | null;
  key2: string;
  value2: string;
}

export const formUrlQuery = ({
  params,
  key1,
  value1,
  key2,
  value2,
}: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key1] = value1;
  currentUrl[key2] = value2;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

export const today = new Date();
export const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
export const threeMonthsFromToday = new Date(
  new Date().setMonth(new Date().getMonth() + 3)
);

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};
