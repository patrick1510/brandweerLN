export function convertDate(date) {
  // converts this format: 2021-06-30T16:23:00
  return date.replace("T", " ").slice(0, -3);
}
