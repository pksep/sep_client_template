import { getFirstTime } from '@pksep/yui';

export const getUTCDate = getFirstTime;

export const convertUTCToLocal = utcDateString => {
  const date = new Date(utcDateString);

  const timezoneOffsetMinutes = date.getTimezoneOffset();
  const timezoneOffsetHours = -timezoneOffsetMinutes / 60;

  const offsetMs = timezoneOffsetHours * 60 * 60 * 1000;
  const localDate = new Date(date.getTime() + offsetMs);

  const isoString = localDate.toISOString();

  return isoString;
};
