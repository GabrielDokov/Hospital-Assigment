function convertDateToMs(date) {
  return new Date(date).getTime();
}

function convertMsToIso(date) {
  return new Date(date).toISOString();
}

const sortByDate = (a, b) => new Date(a.time) - new Date(b.time);

const dateUtils = {
  convertDateToMs,
  convertMsToIso,
  sortByDate,
};

export default dateUtils