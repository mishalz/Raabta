const getTimeDifference = (date, inFuture) => {
  let futureDate;
  let currentDate;
  let diff = "";

  if (inFuture) {
    futureDate = new Date(date);
    currentDate = new Date();
  } else {
    futureDate = new Date();
    currentDate = new Date(date);
  }

  //see if there are years left
  if (futureDate.getFullYear() >= currentDate.getFullYear()) {
    if (futureDate.getFullYear() > currentDate.getFullYear()) {
      diff = `${futureDate.getFullYear() - currentDate.getFullYear()} years`;
    } else {
      if (futureDate.getMonth() > currentDate.getMonth()) {
        diff = `${futureDate.getMonth() - currentDate.getMonth()} months`;
      } else if (futureDate.getMonth() == currentDate.getMonth()) {
        if (futureDate.getDate() == currentDate.getDate()) {
          diff = `${
            futureDate.getMinutes() - currentDate.getMinutes()
          } minutes`;
        } else if (futureDate.getDate() > currentDate.getDate()) {
          diff = `${futureDate.getDate() - currentDate.getDate()} days`;
        }
      }
    }
  }

  return diff;
};
export default getTimeDifference;
