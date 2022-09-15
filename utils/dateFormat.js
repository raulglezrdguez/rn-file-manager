const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const dateToString = dateString => {
  const d = new Date(dateString);
  const dayIndex = d.getDay();
  const dayName = days[dayIndex];
  const monthName = months[d.getMonth()];
  return `${dayName}, ${d.getDate()} ${monthName} ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
};
