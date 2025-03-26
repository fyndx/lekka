export const convertUTCToLocalTime = (dateString) => {
  const date = new Date(dateString);
  const milliseconds = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );
  const localTime = new Date(milliseconds);
  return localTime;
};
