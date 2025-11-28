export const getTimeFromMinute = (minute: number) => {
  if (!minute) {
    return '0.00 / 0';
  }
  return (
    Math.max(Number((minute / 60).toFixed(2)), 0.01) +
    ' / ' +
    Number(minute.toFixed(0))
  );
};

export const getTimeFromHour = (hour: number) => {
  if (!hour) {
    return '0.00 / 0';
  }
  return (
    Number(Number(hour).toFixed(2)) + ' / ' + Number((hour * 60).toFixed(0))
  );
};
