const getIndexedArray = (count: number) =>
  Array.from({ length: count }).map((_, i) => i);

const revertSum = (sum: number, arrayLength: number) => {
  const perIteration = sum / arrayLength;
  let accumulator = 0;
  const arr = [];
  for (let index = 0; index < arrayLength; index++) {
    let toAdd = 0;
    if (index === arrayLength - 1) {
      toAdd = sum - arr.reduce((a, b) => a + b);
    } else if (accumulator > 1) {
      const takenFromAccumulator = Math.ceil(perIteration) - perIteration;
      toAdd = takenFromAccumulator + perIteration;
      accumulator -= takenFromAccumulator;
    } else {
      toAdd = perIteration;
    }

    const delta = toAdd - Math.floor(toAdd);
    accumulator += delta;
    arr.push(Math.floor(toAdd));
  }
  return arr;
};

const gaussianRand = () => {
  var rand = 0;

  for (var i = 0; i < 6; i += 1) {
    rand += Math.random();
  }

  return rand / 6;
};
export { getIndexedArray, revertSum, gaussianRand };
