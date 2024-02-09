export const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const genderArray = ["Male", "Female", "Other"];

export const bloodGroupArray = [
  "O+",
  "O-",
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
];

export const daysArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const monthsOptions = monthsArray.map((item) => ({
  value: item,
  label: item,
}));

export const genderOptions = genderArray.map((item) => ({
  value: item.toLowerCase(),
  label: item,
}));

export const bloodGroupOptions = bloodGroupArray.map((item) => ({
  value: item,
  label: item,
}));

export const daysOptions = daysArray.map((item) => ({
  value: item,
  label: item,
}));
