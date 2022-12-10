import {Dispatch, SetStateAction} from "react";
import {IUseStack} from "./use-stack.interface";
import {
  Predicate,
  sharedLinearDataFunctions,
  UseDataStructure
} from "@data-structures-react-hooks/data-structures-react-hooks-shared";
import assign from "lodash.assign";

export const useStackFactory = <T>(stack: T[], setStack: Dispatch<SetStateAction<T[]>>): IUseStack<T> => {
  const stackHandlerBase: UseDataStructure<T, Array<T>> = ({
    merge: (other: T[]) => setStack((prev) => [...prev, ...other]),
    find: (pred: Predicate<T>) => stack.find(pred),
    remove: (item: T) => setStack(arr => arr.filter(i => i !== item)),
    set: (newArray: Iterable<T>) => setStack([...newArray]),
    sort: (compareFn?: (a: T, b: T) => number) => setStack(arr => [...arr].sort(compareFn)),
    removeAll: () => setStack([]),
    findAndUpdate: (pred: Predicate<T>, updatedItem: Partial<T>) => setStack(arr => {
      const idx = arr.findIndex(pred);
      if (idx !== -1) {
        assign(arr[idx], updatedItem)
      }
      return [...arr];
    }),

    // return a shallow copy (for performance reasons)
    get current() {
      return [...stack];
    },
    get empty() {
      return !stack || stack.length === 0;
    },
    get notEmpty() {
      return stack && stack.length > 0;
    },
    [Symbol.iterator]: function* () {
      for (const value of stack.values()) {
        yield value;
      }
    },
  })

  const stackHandlerExtras = {
    push: (item: T): void => {
      setStack(arr => [...arr, item]);
    },
    pop: (): T => {
      const last = stack[stack.length - 1];
      setStack(arr => arr.slice(0, -1));
      return last;
    },
    peek: (): T => {
      return stack[stack.length - 1];
    }
  }

  return Object.assign({}, stackHandlerBase, stackHandlerExtras, sharedLinearDataFunctions(stackHandlerBase));
}
