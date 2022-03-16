import { format } from "date-fns";

export const getFormattedDate = (
  date = new Date(),
  givenFormat = "yyyy-MM-dd"
) => {
  return format(date, givenFormat);
};
