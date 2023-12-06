const getTimeDifference = (date, inFuture) => {
  let futureDate;
  let currentDate;
  let diffs = "";
  let diff;

  if (inFuture) {
    futureDate = new Date(date);
    currentDate = new Date();
  } else {
    futureDate = new Date();
    currentDate = new Date(date);
  }

  if (futureDate.getFullYear() > currentDate.getFullYear()) {
    diff = futureDate.getFullYear() - currentDate.getFullYear();
    diffs = `${diff} year`;
  } else if (futureDate.getFullYear() == currentDate.getFullYear()) {
    if (futureDate.getMonth() > currentDate.getMonth()) {
      diff = futureDate.getMonth() - currentDate.getMonth();
      diffs = `${diff} month`;
    } else if (futureDate.getMonth() == currentDate.getMonth()) {
      if (futureDate.getDate() == currentDate.getDate()) {
        if (futureDate.getHours() == currentDate.getHours()) {
          diff = futureDate.getMinutes() - currentDate.getMinutes();
          diffs = `${diff} minute`;
        } else if (futureDate.getHours() > currentDate.getHours()) {
          diff = futureDate.getHours() - currentDate.getHours();
          diffs = `${diff} hour`;
        }
      } else if (futureDate.getDate() > currentDate.getDate()) {
        diff = futureDate.getDate() - currentDate.getDate();
        diffs = `${diff} day`;
      }
    }
  }

  if (diff > 1) diffs += "s";

  return diffs;
};
export default getTimeDifference;
