export function evaluate(config) {
  //   console.log(config);
  const ret = { ...config };
  console.log("early", ret);

  for (const item in config) {
    console.log("item", +config[item]);
  }

  console.log("late", ret);
  //   return ret;
}

// function containsOnlyNumbers(str) {
//   return /^\d+$/.test(str);
// }
