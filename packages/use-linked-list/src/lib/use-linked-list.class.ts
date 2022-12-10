import {Predicate, UseLinearDataStructureClass} from "@data-structures-react-hooks/data-structures-react-hooks-shared";
import {LinkedList} from "./linked-list.class";
import {Dispatch, SetStateAction} from "react";
import {IUseLinkedList} from "./use-linked-list.interface";


export class UseLinkedList<T> extends UseLinearDataStructureClass<T, LinkedList<T>> implements IUseLinkedList<T> {
  state: LinkedList<T> = new LinkedList<T>();

  setState: Dispatch<SetStateAction<LinkedList<T>>> = () => void(0);

  // return a shallow copy (for performance reasons)
  get current() {
    return new LinkedList([...this.state]);
  }

  get empty() {
    return !this.state || this.state.length === 0;
  }

  get notEmpty() {
    return this.state && this.state.length > 0;
  }

  get length() {
    return this.state.length;
  }

  [idx: number]: T;

  *[Symbol.iterator]() {
    for (const value of this.state.values()) {
      yield value;
    }
  }

  constructor(state: LinkedList<T>, setState: Dispatch<SetStateAction<LinkedList<T>>>) {
    super();
    this.state = state;
    this.setState = setState;
    const proxy = new Proxy(this, {
      get: function (target: UseLinkedList<T>, propOrIndex: string | symbol): T | undefined {
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

    proxy.toString = () => this.state.toString();
    return proxy;
  }

  merge(other: LinkedList<T>) {
    this.setState((prev) => {
      const newList = new LinkedList(prev);
      newList.pushRange(other);
      return newList;
    });
  }

  find(pred: Predicate<T>) {
    return this.state.find(pred);
  }

  remove(item: T) {
    return this.setState(arr => new LinkedList([...arr].filter(i => i !== item)));
  }

  set(newArray: Iterable<T>) {
    return this.setState(new LinkedList(newArray));
  }

  sort(compareFn?: (a: T, b: T) => number) {
    return this.setState(arr => new LinkedList([...arr].sort(compareFn)));
  }

  removeAll() {
    return this.setState(new LinkedList());
  }

  findAndUpdate(pred: Predicate<T>, updatedItem: Partial<T>) {
    return this.setState(arr => {
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
    });
  }

  override toString(): string {
    return [...this.state].toString();
  }

  at(idx: number) {
    return this.state.at(idx);
  }

  filter(pred: Predicate<T>) {
    return [...this.state].filter(pred);
  }

  findIndex(pred: Predicate<T>) {
    return this.state.findIndex(pred);
  }

  indexOf(item: T) {
    return this.state.indexOf(item);
  }

  map<S>(mapFn: (value: T, index?: number, array?: T[]) => S) {
    return [...this.state].map<S>(mapFn);
  }

  pop() {
    let popped: T | undefined;
    this.setState(list => {
      popped = list.pop();
      return list;
    })
    return popped;
  }

  push(newItem: T) {
    this.setState(list => {
      list.push(newItem);
      return list;
    });
    return newItem;
  }

  pushRange(newItems: Iterable<T>) {
    return this.setState(list => {
      list.pushRange(newItems);
      return list;
    });
  }

  reduce<S>(callbackFn: (previousValue: S, currentValue: T) => S, initialValue: S) {
    return [...this.state].reduce<S>(callbackFn, initialValue);
  }

  slice(start: number, end: number) {
    return this.state.slice(start, end);
  }

  splice(start: number, deleteCount: number, ...items: T[]) {
    let spliced: T[] = [];
    this.setState(list => {
      spliced = list.splice(start, deleteCount, ...items);
      return list;
    });
    return spliced;
  }

  removeAt(idx: number) {
    return this.setState(list => new LinkedList<T>([...list].filter((item, i) => i !== idx)));
  }

  removeRange(start: number, end: number) {
    return this.setState(list => new LinkedList([...list].filter((item, i) => i < start || i >= end)));
  }

  update(idx: number, updatedItem: Partial<T>) {
    return this.setState(list => {
      if (list.at(idx)) {
        if (typeof updatedItem === 'object') {
          list.updateAt(idx, {
            ...list.at(idx),
            ...updatedItem
          } as T);
        } else {
          list.updateAt(idx, updatedItem as T);
        }
      }
      return list;
    });
  }
}
