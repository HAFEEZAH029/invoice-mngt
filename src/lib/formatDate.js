export function formatDate(dateInput) {
  const date = dateInput instanceof Date
    ? dateInput
    : new Date(dateInput)

  const day = date.getDate();
  const year = date.getFullYear();

  const months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ];

  const month = months[date.getMonth()];

  function suffix(day) {
    if (day > 3 && day < 21) return "th";

    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  return `${day}${suffix(day)} ${month} ${year}`;
}