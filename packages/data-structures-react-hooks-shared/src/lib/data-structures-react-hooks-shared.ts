import {Predicate, UseDataStructure, UseLinearDataStructure} from "./interfaces";
import {Comparator2, ValueIteratee, difference, differenceBy, intersection, intersectionBy, intersectionWith} from "lodash";

export function dataStructuresReactHooksShared(): string {
  return 'data-structures-react-hooks-shared';
}

export const sharedLinearDataFunctions = <T, S>(data: UseDataStructure<T, S>): UseLinearDataStructure<T, S> => ({
  ...data,
  difference: (other: Iterable<T>): T[] => {
    return difference([...data], [...other]);
  },
  differenceBy: (other: Iterable<T>, by: ValueIteratee<T>): T[] => {
    return differenceBy([...data], [...other], by);
  },
  entries: (): IterableIterator<[number, T]> => {
    return [...data].entries();
  },
  every: (pred: Predicate<T>): boolean => {
    for (const item of data) {
      if (!pred(item)) {
        return false;
      }
    }
    return true;
  },
  some: (pred: Predicate<T>): boolean => {
    for (const item of data) {
      if (pred(item)) {
        return true;
      }
    }
    return false;
  },
  includes: (item: T): boolean => {
    for (const i of data) {
      if (i === item) {
        return true;
      }
    }
    return false;
  },
  intersection: (other: Iterable<T>): T[] => {
    return intersection([...data], [...other]);
  },
  intersectionBy: (other: Iterable<T>, iteratee: ValueIteratee<T>): T[] => {
    return intersectionBy([...data], [...other], iteratee);
  },
  intersectionWith: (other: Iterable<T>, pred: Comparator2<T, T>): T[] => {
    return intersectionWith([...data], [...other], pred);
  },
  size: (pred?: Predicate<T>): number => {
    let count = 0;
    for (const i of data) {
      if (pred && !pred(i)) {
        continue;
      }
      count++;
    }
    return count;
  },
  values: (): IterableIterator<T> => {
    return [...data].values();
  }
});
