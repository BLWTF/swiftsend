export const capitalizeFirst = (string) =>
  string
    .split(" ")
    .reduce(
      (a, c) =>
        `${a === "" ? "" : a + " "}${c.charAt(0).toUpperCase()}${c.slice(1)}`,
      ""
    );

export const getSets = (count, limit) => {
  const sets = count / limit;
  if (sets < 1) {
    return 1;
  }

  if (count % limit > 0) {
    return Math.floor(sets) + 1;
  }

  return sets;
};

export const formatSets = (sets) => {
  let setsList = [];
  for (let i = 0; i < sets; i++) {
    setsList.push({ text: i + 1 });
  }
  return setsList;
};


export const formatRecentDate = (dateString) => {
  const date = new Date(dateString);
  const timeString = date.toLocaleString().split(", ")[1];
  const day =
    date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
      ? "Today"
      : date.toUTCString().split(",")[0];
  return `${day} ${timeString}`;
};

export const generateString = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}