import {Dispatch, SetStateAction} from "react";
import {IUseLinkedList} from "./use-linked-list.interface";
import {
  Predicate,
  sharedLinearDataFunctions,
  UseDataStructure
} from "@data-structures-react-hooks/data-structures-react-hooks-shared";
import {LinkedList} from "./linked-list.model";

export const useLinkedListFactory = <T>(linkedList: LinkedList<T>, setLinkedList: Dispatch<SetStateAction<LinkedList<T>>>): IUseLinkedList<T> => {
  const arrayHandlerBase: UseDataStructure<T, Array<T>> = ({
    merge: (other: T[]) => setLinkedList((prev) => {
        const newList = new LinkedList(prev);
        newList.pushRange(other);
        return newList;
    }),
    find: (pred: Predicate<T>) => linkedList.find(pred),
    remove: (item: T) => setLinkedList(arr => new LinkedList([...arr].filter(i => i !== item))),
    set: (newArray: Iterable<T>) => setLinkedList(new LinkedList(newArray)),
    sort: (compareFn?: (a: T, b: T) => number) => setLinkedList(arr => new LinkedList([...arr].sort(compareFn))),
    removeAll: () => setLinkedList(new LinkedList()),
    findAndUpdate: (pred: Predicate<T>, updatedItem: Partial<T>) => setLinkedList(arr => {
      const item = arr.find(pred);
      if (typeof updatedItem === 'object' && item) {
        arr.updateAt(arr.findIndex(pred), {
          ...item,
          updatedItem
        });
      } else {
        arr.updateAt(arr.findIndex(pred), updatedItem as T);
      }
      return arr;
    }),

    // return a shallow copy (for performance reasons)
    get current() {
      return [...linkedList];
    },
    get empty() {
      return !linkedList || linkedList.length === 0;
    },
    get notEmpty() {
      return linkedList && linkedList.length > 0;
    },
    [Symbol.iterator]: function* () {
      for (const value of linkedList.values()) {
        yield value;
      }
    },
  })

  const arrayHandlerExtras = {
    at: (idx: number) => linkedList.at(idx),
    filter: (pred: Predicate<T>) => [...linkedList].filter(pred),
    findIndex: (pred: Predicate<T>) => linkedList.findIndex(pred),
    indexOf: (item: T) => linkedList.indexOf(item),
    map: <S>(mapFn: (value: T, index?: number, array?: T[]) => S) => [...linkedList].map<S>(mapFn),
    pop: () => {
      let popped: T | undefined;
      setLinkedList(linkedList => {
        popped = linkedList.pop();
        return linkedList;
      })
      return popped;
    },
    push: (newItem: T) => {
      setLinkedList(linkedList => {
        linkedList.push(newItem);
        return linkedList;
      });
      return newItem;
    },
    pushRange: (newItems: Iterable<T>) => setLinkedList(linkedList => {
      linkedList.pushRange(newItems);
      return linkedList;
    }),
    reduce: <S>(callbackFn: (previousValue: S, currentValue: T) => S, initialValue: S) => {
      return [...linkedList].reduce<S>(callbackFn, initialValue);
    },
    slice: (start: number, end: number) => {
      return linkedList.slice(start, end);
    },
    splice: (start: number, deleteCount: number, ...items: T[]) => {
      let spliced: T[] = [];
      setLinkedList(linkedList => {
        spliced = linkedList.splice(start, deleteCount, ...items);
        return linkedList;
      });
      return spliced;
    },
    removeAt: (idx: number) => setLinkedList(linkedList => new LinkedList<T>([...linkedList].filter((item, i) => i !== idx))),
    removeRange: (start: number, end: number) => setLinkedList(linkedList => new LinkedList([...linkedList].filter((item, i) => i < start || i >= end))),
    update: (idx: number, updatedItem: Partial<T>) => setLinkedList(linkedList => {
      if (linkedList.at(idx)) {
        if (typeof updatedItem === 'object') {
          linkedList.updateAt(idx, {
            ...linkedList.at(idx),
            ...updatedItem
          } as T);
        } else {
          linkedList.updateAt(idx, updatedItem as T);
        }
      }
      return linkedList;
    }),
    get length() {
      return linkedList.length;
    }
  }

  const arrayHandler: IUseLinkedList<T> = Object.assign({}, arrayHandlerBase, arrayHandlerExtras, sharedLinearDataFunctions(arrayHandlerBase));

  const proxy = new Proxy(arrayHandler, {
    get: function (target: IUseLinkedList<T>, propOrIndex: string | symbol): T | undefined {
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

  proxy.toString = () => linkedList.toString();
  return proxy;
}
