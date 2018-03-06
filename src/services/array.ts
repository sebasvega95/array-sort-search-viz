function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export enum SortingAlgorithm {
  quicksort,
  heapsort,
  cocktail
}

export async function sortArray(
  array: number[],
  method: SortingAlgorithm,
  swapInArray: (i: number, j: number) => void,
  callback: () => void
) {
  switch (method) {
    case SortingAlgorithm.quicksort: {
      await quicksort(array, 0, array.length - 1, swapInArray);
      break;
    }
    case SortingAlgorithm.heapsort: {
      await heapsort(array, swapInArray);
      break;
    }
    case SortingAlgorithm.cocktail: {
      await cocktailSort(array, swapInArray);
      break;
    }
    default:
      throw new Error('Invalid method');
  }
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

async function heapify(
  array: number[],
  n: number,
  i: number,
  swapInArray: (i: number, j: number) => void
) {
  let largest = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;

  if (l < n && array[l] > array[largest]) {
    largest = l;
  }
  if (r < n && array[r] > array[largest]) {
    largest = r;
  }

  if (largest !== i) {
    [array[i], array[largest]] = [array[largest], array[i]];
    swapInArray(i, largest);
    await timeout(1);
    await heapify(array, n, largest, swapInArray);
  }
}

async function heapsort(
  array: number[],
  swapInArray: (i: number, j: number) => void
) {
  const n = array.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(array, n, i, swapInArray);
  }

  for (let i = n - 1; i >= 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    swapInArray(0, i);
    await timeout(1);
    await heapify(array, i, 0, swapInArray);
  }
}

async function cocktailSort(
  array: number[],
  swapInArray: (i: number, j: number) => void
) {
  let swapped = true;
  let start = 0;
  let end = array.length - 1;

  while (swapped) {
    swapped = false;
    for (let i = start; i < end; ++i) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapInArray(i, i + 1);
        await timeout(1);
        swapped = true;
      }
    }
    if (!swapped) break;
    swapped = false;
    end--;
    for (let i = end - 1; i >= start; --i) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapInArray(i, i + 1);
        await timeout(1);
        swapped = true;
      }
    }
    start++;
  }
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
