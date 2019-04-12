import jalaali from 'jalaali-js';

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

const PERSIAN_NUMBERS = ['۰', '۱','۲','۳','۴','۵','۶','۷','۸','۹'];
const PERSIAN_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];
const { jy: J_YEAR, jm: J_MONTH, jd: J_DAY } = jalaali.toJalaali(year, month, day);
const CURRENT_DATE = { year: J_YEAR, month: J_MONTH, day: J_DAY  };
const WEEK_DAYS = {
  saturday: 'شنبه',
  sunday: 'یکشنبه',
  monday: 'دوشنبه',
  tuesday: 'سه شنبه',
  wednesday: 'چهارشنبه',
  thursday: 'پنجشنبه',
  friday: 'جمعه',
};

const createUniqueRange = (number, startingId) => Array
  .from(Array(number)
  .keys())
  .map(number => ({ value : number + 1, id: `${startingId}-${number}` }))

const toPersianNumber = number => number
  .toString()
  .split('')
  .map(letter => PERSIAN_NUMBERS[Number(letter)])
  .join('');

const getMonthName = (month = CURRENT_DATE.month) => PERSIAN_MONTHS[month - 1];

const getMonthLength = (date = CURRENT_DATE) => jalaali.jalaaliMonthLength(date.year, date.month);

const getMonthFirstWeekday = (_date = CURRENT_DATE) => {
  const gregorianFirstDay = jalaali.toGregorian(_date.year, _date.month, 1);
  const gregorianDate = new Date(gregorianFirstDay.gy, gregorianFirstDay.gm - 1, gregorianFirstDay.gd);
  const weekday = gregorianDate.getDay();
  return weekday < 6 ? weekday + 1 : 0;
};

const getDateAccordingToMonth = (date, direction) => {
  const toSum = direction === 'NEXT' ? 1 : -1;
  let newMonthIndex = date.month + toSum;
  let newYear = date.year;
  if (newMonthIndex < 1) {
    newMonthIndex = 12;
    newYear -= 1;
  }
  if (newMonthIndex > 12) {
    newMonthIndex = 1;
    newYear += 1;
  }
  const newDate = { year: newYear, month: newMonthIndex, day: 1 };
  return newDate;
};

const isSameDay = (day1, day2) => {
  if (!day1 || !day2) return false;
  return (
    day1.day === day2.day &&
    day1.month === day2.month &&
    day1.year === day2.year
  );
};

const toExtendedDay = date => [date.year, date.month, date.day];

const toNativeDate = date => {
  const gregorian = jalaali.toGregorian(...toExtendedDay(date));
  return new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd);
};

const isBeforeDate = (day1, day2) => {
  if (!day1 || !day2 ) return false;
  return toNativeDate(day1) <= toNativeDate(day2);
};

const checkDayInDayRange = ({ day, from, to }) => {
  if (!day || !from || !to) return false;
  const nativeDay = toNativeDate(day);
  const nativeFrom = toNativeDate(from);
  const nativeTo = toNativeDate(to);
  return (nativeDay > nativeFrom) && (nativeDay < nativeTo);
};

const putZero = number => number.toString().length === 1 ? `0${number}` : number;
const shallowCloneObject = obj => ({...obj});

export {
  WEEK_DAYS,
  CURRENT_DATE,
  PERSIAN_MONTHS,
  toPersianNumber,
  createUniqueRange,
  getMonthName,
  getMonthLength,
  getMonthFirstWeekday,
  getDateAccordingToMonth,
  isSameDay,
  checkDayInDayRange,
  isBeforeDate,
  putZero,
  shallowCloneObject,
};