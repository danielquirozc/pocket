export function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",  
  };
  return date.toLocaleDateString("en-US", options);
}