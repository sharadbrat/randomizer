module.exports.minmax = function minmax(v, min, max, newmin, newmax) {
  return (v - min) / (max - min) * (newmax - newmin) + newmin
};


module.exports.sum = function sum(numbers) {
  return numbers.reduce((prev, curr) => prev + curr, 0);
};
