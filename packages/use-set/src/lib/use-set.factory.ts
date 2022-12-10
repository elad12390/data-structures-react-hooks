import {IUseSet} from "./use-set.interface";
import {Dispatch, SetStateAction} from "react";
import {
  Predicate,
  sharedLinearDataFunctions,
  UseDataStructure
} from "@data-structures-react-hooks/data-structures-react-hooks-shared";
import assign from "lodash.assign";

export const useSetFactory = <T>(hashSet: Set<T>, setHashSet: Dispatch<SetStateAction<Set<T>>>): IUseSet<T> => {
  const setHandlerBase: UseDataStructure<T, Set<T>> = ({
    merge: (other: Set<T>) => setHashSet((prev) => new Set([...prev, ...other])),
    find: (pred: Predicate<T>) => [...hashSet].find(pred),
    remove: (item: T) => setHashSet(set => new Set([...set].filter(i => i !== item))),
    set: (iterable: Iterable<T>) => setHashSet(new Set(iterable)),
    sort: () => {return;}, // cant sort a set
    removeAll: () => setHashSet(new Set()),
    findAndUpdate: (pred: Predicate<T>, updatedItem: Partial<T>) => setHashSet(set => {
      const found = [...set].find(pred);
      if (found) {
        assign(found, updatedItem)
      }
      return set;
    }),

    // return a shallow copy
    get current() {
      return new Set(hashSet);
    },
    get empty() {
      return !hashSet || hashSet.size === 0;
    },
    get notEmpty() {
      return hashSet && hashSet.size > 0;
    },
    [Symbol.iterator]: function* () {
      for (const value of hashSet.values()) {
        yield value;
      }
    },
  })

  const setHandlerExtras = {
    add: (item: T): void => {
      setHashSet(set => new Set([...set, item]));
    },
    addRange: (items: Iterable<T>): void => {
      setHashSet(set => new Set([...set, ...items]));
    },
    clear: (): void => {
      setHashSet(new Set());
    },
    delete: (item: T): void => {
      setHashSet(set => new Set([...set].filter(i => i !== item)));
    },
    has: (item: T): boolean => {
      return hashSet.has(item);
    }
  }

  return Object.assign({}, setHandlerBase, setHandlerExtras, sharedLinearDataFunctions(setHandlerBase));
}
