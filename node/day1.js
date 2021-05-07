let ver1 = ["2", "2", "2"];
let ver2 = ["2", "2", "1"];
let length = ver2.length > ver1.length ? ver2.length : ver1.length;
const versionCheckFn = (fir, sec, len, i) => {
  var value1 = i < fir.length ? parseInt(fir[i], 10) : 0;
  var value2 = i < sec.length ? parseInt(sec[i], 10) : 0;
  let result = 0;
  if (len < 1) return result;
  if (isNaN(value1)) {
    value1 = 0;
  }
  if (isNaN(value2)) {
    value2 = 0;
  }
  if (value1 !== value2) return (result = value1 > value2 ? 1 : -1);
  console.log(
    "works",
    fir,
    sec,
    len,
    "value change ===>",
    value1,
    value2,
    result
  );
  return versionCheckFn(fir, sec, len - 1, i + 1);
};

let val = versionCheckFn(ver1, ver2, length, 0);
console.log(val);

// const fun = (n) => {
//   console.log(n);
//   if (n === 1) {
//     return n;
//   }
//   return n + n;
//   fun(n - 1);
// };
// let output = fun(5);

// console.log(output);
