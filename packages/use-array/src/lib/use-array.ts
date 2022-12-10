import {useMemo, useState} from 'react';
import {IUseArray} from "./use-array.interface";
import {Predicate} from "@data-structures-react-hooks/data-structures-react-hooks-shared";
import intersectionWith from 'lodash.intersectionwith';
import intersectionBy from 'lodash.intersectionby';
import intersection from 'lodash.intersection';
import differenceBy from 'lodash.differenceby';
import difference from 'lodash.difference';
import assign from 'lodash.assign';
import { Comparator2,  ValueIteratee} from 'lodash';

export function useArray<T>(initial: T[] = []): IUseArray<T> {
  const [array, setArray] = useState<T[]>([...initial]);

  return useMemo(() => {
    const arrayHandler = ({
      at: (idx: number) => array.at(idx),
      filter: (pred: Predicate<T>) => array.filter(pred),
      find: (pred: Predicate<T>) => array.find(pred),
      findIndex: (pred: Predicate<T>) => array.findIndex(pred),
      includes: (item: T) => array.indexOf(item) !== -1,
      indexOf: (item: T) => array.indexOf(item),
      every: (pred: Predicate<T>) => array.every(pred),
      some: (pred: Predicate<T>) => array.some(pred),
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
      remove: (item: T) => setArray(arr => arr.filter(i => i !== item)),
      set: (newArray: Iterable<T>) => setArray([...newArray]),
      sort: (compareFn: (a: T, b: T) => number) => setArray(arr => [...arr].sort(compareFn)),
      slice: (start: number, end: number) => array.slice(start, end),
      splice: (start: number, deleteCount: number, ...items: T[]) => {
        const removed = array.slice(start, start + deleteCount);
        setArray(arr => arr.splice(start, deleteCount, ...items));
        return removed;
      },
      values: () => array.values(),
      entries: () => array.entries(),
      removeAt: (idx: number) => setArray(arr => arr.filter((item, i) => i !== idx)),
      removeRange: (start: number, end: number) => setArray(arr => arr.filter((item, i) => i < start || i >= end)),
      removeAll: () => setArray([]),
      update: (idx: number, updatedItem: Partial<T>) => setArray(arr => {
        assign(arr[idx], updatedItem);
        return arr;
      }),
      difference: (other: Iterable<T>) => difference(array, [...other]),
      differenceBy: (other: Iterable<T>, by: ValueIteratee<T>) => differenceBy(array, [...other], by),
      intersection: (other: Iterable<T>) => intersection<T>(array, [...other]),
      intersectionBy: (other: Iterable<T>, iteratee: ValueIteratee<T>) => intersectionBy(array, [...other], iteratee),
      intersectionWith: (other: Iterable<T>, fn: Comparator2<T, T>) => intersectionWith(array, [...other], fn),
      size: (pred?: Predicate<T>) => pred ? array.filter(pred).length : array.length,
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
      get length() {
        return array.length;
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
      }
    })

    const proxy = new Proxy(arrayHandler, {
      get: function(target: IUseArray<T>, propOrIndex: string | symbol): T | undefined {
        if (typeof propOrIndex === 'string') {
          const num = Number.parseInt(propOrIndex);
          if (!Number.isNaN(num) && num >= 0) {
            return target.at(num);
          }
        }
        return target[propOrIndex];
      },
    });

    proxy.toString = () => array.toString();
    return proxy;
  }, [array, setArray])
}
