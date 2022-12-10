import {Comparator2, ValueIteratee} from "lodash";

export type Predicate<T> = (item: T) => boolean;

export type UseDataStructure<T, S> = {
  readonly current: S;
  readonly empty: boolean;
  readonly notEmpty: boolean;
  find: (pred: Predicate<T>) => T | undefined;
  findAndUpdate: (pred: Predicate<T>, updatedItem: Partial<T>) => void;
  remove: (item: T) => void;
  removeAll: () => void;
  sort: (compareFn: (a: T, b: T) => number) => void;
  merge: (other: S) => void;
  set: (newCollection: Iterable<T>) => void;
  [Symbol.iterator](): Generator<T>;
  [anySymbol: symbol]: any;
  toString(): string;
}

export type UseLinearDataStructure<T, S> = UseDataStructure<T, S> & {
  difference: (other: Iterable<T>) => T[];
  differenceBy: (other: Iterable<T>, by: ValueIteratee<T>) => T[];
  entries: () => IterableIterator<[number, T]>;
  every: (pred: Predicate<T>) => boolean;
  some: (pred: Predicate<T>) => boolean;
  includes: (item: T) => boolean;
  intersection: (other: Iterable<T>) => T[];
  intersectionBy: (other: Iterable<T>, iteratee: ValueIteratee<T>) => T[];
  intersectionWith: (other: Iterable<T>, pred: Comparator2<T, T>) => T[];
  size: (pred?: Predicate<T>) => number;
  values: () => IterableIterator<T>;
}
