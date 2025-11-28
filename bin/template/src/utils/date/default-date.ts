import type { IRangeForDatePicker } from '@pksep/yui';
import { getUTCDate } from '@/utils/date/get-utc-date';

export const areDatesEqual = (date1: Date, date2: Date): boolean => {
  if (!date1 || !date2) return false;

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const getTimeMinutes = (minutes: number): string => {
  const minutesFormated = Number(Number(minutes).toFixed(2));
  const hour = Number(minutesFormated / 60).toFixed(2);
  return `${hour} / ${minutesFormated}`;
};

// используется для запроса фильтрации
export const getTimeForRequest = (
  range: IRangeForDatePicker
): IRangeForDatePicker => {
  const newRange: IRangeForDatePicker = {
    start: getUTCDate(range?.start || new Date(0)),
    end: getUTCDate(range?.end || new Date(2100, 0, 1))
  };

  newRange.start = new Date(
    newRange.start.getTime() + newRange.start.getTimezoneOffset() * 60000
  );

  newRange.end = new Date(
    newRange.end.getTime() +
      newRange.end.getTimezoneOffset() * 60000 +
      24 * 60 * 60 * 1000 -
      1
  );

  return newRange;
};
