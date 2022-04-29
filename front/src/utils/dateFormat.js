import { format } from "date-fns";

export const getFormattedDate = (
  date = new Date(),
  givenFormat = "yyyy-MM-dd"
) => {
  return format(date, givenFormat);
};

export const ReportFormattedDate = (
  date = new Date(),
  givenFormat = "yyyy. MM. dd"
) => {
  const rdate = new Date(date);
  return format(rdate, givenFormat);
};

export const careerFormattedDate = (date) => {
  const nowDate = new Date().getFullYear();
  const rDate = new Date(date).getFullYear();
  return nowDate - rDate;
};

export const participateFormattedDate = (period_target) => {
  switch (period_target) {
    case 0:
      return "1년 미만";
    case 1:
      return "1년 이상 3년 미만";
    case 2:
      return "3년 이상 5년 미만";
    case 3:
      return "5년 이상 7년 미만";
    case 4:
      return "7년 이상";
    default:
      return "1년 미만";
  }
};
