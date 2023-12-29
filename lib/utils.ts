import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, compareAsc, isToday, parse } from "date-fns";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface UrlQueryParams1 {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery1 = ({ params, key, value }: UrlQueryParams1) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface UrlQueryParams2 {
  params: string;
  key1: string;
  value1: string | null;
  key2: string;
  value2: string;
}

export const formUrlQuery2 = ({
  params,
  key1,
  value1,
  key2,
  value2,
}: UrlQueryParams2) => {
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

export const isDateBeforeToday = (date: string) => {
  const parts = date.split(".");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  const inputDate = new Date(year, month - 1, day + 1);

  return inputDate < today;
};

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

export const shouldDisableTimes = (
  selectedDate: string,
  selectedTime: string
) => {
  const now = new Date();
  const formattedSelectedDate = parse(selectedDate, "dd/MM/yyyy", new Date());

  if (isToday(formattedSelectedDate)) {
    const currentFormattedTime = format(now, "HH:mm");
    const selectedDateTime = parse(
      `${selectedDate} ${selectedTime}`,
      "dd/MM/yyyy HH:mm",
      new Date()
    );

    return (
      compareAsc(selectedDateTime, now) === -1 ||
      selectedTime <= currentFormattedTime
    );
  }

  return false;
};
