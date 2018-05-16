// Regex to match ISO8601 format
// DR: it handles all the format rules, but doesn't check for valid days in a specific month. Possible future improvements.
const regex = /^([-+]?\d{4})(-(?:(?:W(?:0[^0]|5[0-3]|[1-4][0-9])(-[1-7])?)|(?:(?:0[^0]|1[0-2])(-(?:0[^0]|[1-2]\d|3[0-1]))?)))?(T(?:[0-1]\d|2[0-3])(?::[0-5]\d)?(?::[0-5]\d)?(?:Z|[+-](?:[0-1]\d|2[0-3])(?::[0-5]\d)?)?)?$/;

const daysInMonth = (month, year) => {
  switch (month) {
    case 1:
      return (year % 4 == 0 && year % 100) || year % 400 == 0 ? 29 : 28;
    case 8:
    case 3:
    case 5:
    case 10:
      return 30;
    default:
      return 31;
  }
};

const isValidDate = (day, month, year) => {
  month = parseInt(month, 10) - 1;
  return month >= 0 && month < 12 && day > 0 && day <= daysInMonth(month, year);
};

/**
 * Check if a date is a valid ISO8601 date
 * @param {string} date The date
 */
const isValidISODate = date => {
  if (!RegExp(regex).test(date)) {
    return false;
  }

  const parsedDate = new Date(date);
  return isValidDate(
    parsedDate.getDate(),
    parsedDate.getMonth() + 1,
    parsedDate.getFullYear()
  );
};

export default isValidISODate;
