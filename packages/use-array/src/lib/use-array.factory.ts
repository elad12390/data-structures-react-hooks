import {Dispatch, SetStateAction} from "react";
import {IUseArray} from "./use-array.interface";
import {
  Predicate,
  sharedLinearDataFunctions,
  UseDataStructure
} from "@data-structures-react-hooks/data-structures-react-hooks-shared";
import assign from "lodash.assign";

export const useArrayFactory = <T>(array: T[], setArray: Dispatch<SetStateAction<T[]>>): IUseArray<T> => {
  const arrayHandlerBase: UseDataStructure<T, Array<T>> = ({
    merge: (other: T[]) => setArray((prev) => [...prev, ...other]),
    find: (pred: Predicate<T>) => array.find(pred),
    remove: (item: T) => setArray(arr => arr.filter(i => i !== item)),
    set: (newArray: Iterable<T>) => setArray([...newArray]),
    sort: (compareFn: (a: T, b: T) => number) => setArray(arr => [...arr].sort(compareFn)),
    removeAll: () => setArray([]),
    findAndUpdate: (pred: Predicate<T>, updatedItem: Partial<T>) => setArray(arr => {
      const idx = arr.findIndex(pred);
      if (idx !== -1) {
        assign(arr[idx], updatedItem)
      }
      return [...arr];
    }),

    // return a shallow copy (for performance reasons)
    get current() {
      return [...array];
    },
    get empty() {
      return !array || array.length === 0;
    },
    get notEmpty() {
      return array && array.length > 0;
    },
    [Symbol.iterator]: function* () {
      for (const value of array.values()) {
        yield value;
      }
    },
  })

  const arrayHandlerExtras = {
    at: (idx: number) => array.at(idx),
    filter: (pred: Predicate<T>) => array.filter(pred),
    findIndex: (pred: Predicate<T>) => array.findIndex(pred),
    indexOf: (item: T) => array.indexOf(item),
    map: <S>(mapFn: (value: T, index?: number, array?: T[]) => S) => array.map<S>(mapFn),
    pop: () => {
      const last = array[array.length - 1];
      setArray(arr => arr.slice(0, -1));
      return last;
    },
    push: (newItem: T) => {
      setArray(arr => [...arr, newItem]);
      return newItem;
    },
    pushRange: (newItems: Iterable<T>) => setArray(arr => ([...arr, ...newItems])),
    reduce: <S>(callbackFn: (previousValue: S, currentValue: T) => S, initialValue: S) => array.reduce(callbackFn, initialValue),
    slice: (start: number, end: number) => array.slice(start, end),
    splice: (start: number, deleteCount: number, ...items: T[]) => {
      const removed = array.slice(start, start + deleteCount);
      setArray(arr => arr.splice(start, deleteCount, ...items));
      return removed;
    },
    removeAt: (idx: number) => setArray(arr => arr.filter((item, i) => i !== idx)),
    removeRange: (start: number, end: number) => setArray(arr => arr.filter((item, i) => i < start || i >= end)),
    update: (idx: number, updatedItem: Partial<T>) => setArray(arr => {
      assign(arr[idx], updatedItem);
      return arr;
    }),
    get length() {
      return array.length;
    }
  }

  const arrayHandler: IUseArray<T> = Object.assign({}, arrayHandlerBase, arrayHandlerExtras, sharedLinearDataFunctions(arrayHandlerBase));

  const proxy = new Proxy(arrayHandler, {
    get: function (target: IUseArray<T>, propOrIndex: string | symbol): T | undefined {
      if (typeof propOrIndex === 'string') {
        const num = Number.parseInt(propOrIndex);
        if (!Number.isNaN(num) && num >= 0) {
          return target.at(num);
        }
      } else if (propOrIndex in target) {
        return target[propOrIndex];
      }
      return target[propOrIndex as any];
    },
  });

  proxy.toString = () => array.toString();
  return proxy;
}
