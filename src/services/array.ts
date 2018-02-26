function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function sortArray(
  array: number[],
  swapInArray: (i: number, j: number) => void,
  callback: () => void
) {
  await quicksort(array, 0, array.length - 1, swapInArray);
  callback();
}

async function quicksort(
  array: number[],
  lo: number,
  hi: number,
  swapInArray: (i: number, j: number) => void
) {
  if (lo < hi) {
    const p = await partition(array, lo, hi, swapInArray);
    await quicksort(array, lo, p - 1, swapInArray);
    await quicksort(array, p + 1, hi, swapInArray);
  }
}

async function partition(
  array: number[],
  lo: number,
  hi: number,
  swapInArray: (i: number, j: number) => void
) {
  const pivot = array[hi];
  let i = lo - 1;
  for (let j = lo; j <= hi - 1; j++) {
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      swapInArray(i, j);
      await timeout(1);
    }
  }
  [array[i + 1], array[hi]] = [array[hi], array[i + 1]];
  swapInArray(i + 1, hi);
  await timeout(1);
  return i + 1;
}

export async function lookupClosestSequential(
  array: number[],
  num: number,
  setHighlightedIndices: (indices: number[]) => void,
  callback: (index: number) => void
) {
  let index;
  let minDist = Infinity;
  for (let i = 0; i < array.length; i++) {
    setHighlightedIndices([i]);
    await timeout(20);
    if (num === array[i]) {
      callback(i);
      return;
    }
    const dist = Math.abs(array[i] - num);
    if (dist < minDist) {
      minDist = dist;
      index = i;
    }
  }
  callback(index);
}

export async function lookupClosestBinary(
  array: number[],
  num: number,
  setHighlightedIndices: (indices: number[]) => void,
  callback: (index: number) => void
) {
  let lo = -1; // array[lo] <= num
  let hi = array.length; // array[hi] > num
  let mid;
  while (hi - lo > 1) {
    setHighlightedIndices([hi, lo]);
    await timeout(20);
    mid = Math.floor((hi + lo) / 2);
    if (array[mid] <= num) lo = mid;
    else hi = mid;
  }

  if (Math.abs(array[lo] - num) < Math.abs(array[hi] - num)) {
    callback(lo);
  } else {
    callback(hi);
  }
}
