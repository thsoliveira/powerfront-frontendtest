//parse iso date str to readable date format
function parseDateStr(isoDateStr) {
  const msgDate = new Date(isoDateStr);

  let hours = parseInt(msgDate.getHours());
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const mins = msgDate.getMinutes();

  return hours + ":" + mins + ampm;
}
