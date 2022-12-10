import {Predicate, UseLinearDataStructureClass} from "@data-structures-react-hooks/data-structures-react-hooks-shared";
import {Dispatch, SetStateAction, useState} from "react";
import assign from "lodash.assign";
import {IUseArray} from "./use-array.interface";
export class UseArray<T> extends UseLinearDataStructureClass<T, Array<T>> implements IUseArray<T> {
  state: Array<T> = [];

  setState: Dispatch<SetStateAction<T[]>> = () => void(0);

  [idx: number]: T;

  *[Symbol.iterator](): Generator<T> {
    for (const item of this.state) {
      yield item;
    }
  }

  get current(): Array<T> {
    return [...this.state];
  }

  get empty(): boolean {
    return this.current.length === 0;
  }

  get notEmpty(): boolean {
    return !this.empty;
  }

  get length() {
    return this.state.length;
  }

  constructor(state: Array<T>, setState: Dispatch<SetStateAction<T[]>>) {
    super();
    this.state = state;
    this.setState = setState;

    const proxy = new Proxy(this, {
      get: function (target: UseArray<T>, propOrIndex: string | symbol): any | undefined {
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

  toString(): string {
    return this.state.toString();
  }

  find(pred: Predicate<T>): T | undefined {
    return this.current.find(pred);
  }

  findAndUpdate(pred: Predicate<T>, updatedItem: Partial<T>): void {
    this.setState(prev => {
      const index = prev.findIndex(pred);
      if (index === -1) {
        return prev;
      }

      const newArray = [...prev];
      if (typeof updatedItem === "object") {
        newArray[index] = {...newArray[index], ...updatedItem};
      } else {
        newArray[index] = updatedItem;
      }

      return newArray;
    });
  }

  merge(other: Array<T>): void {
    this.setState(prev => [...prev, ...other]);
  }

  remove(item: T): void {
    this.setState(prev => prev.filter(i => i !== item));
  }

  removeAll(): void {
    this.setState([]);
  }

  set(newCollection: Iterable<T>): void {
    this.setState([...newCollection]);
  }

  sort(compareFn: ((a: T, b: T) => number) | undefined): void {
    this.setState(prev => {
      const newArray = [...prev]
      newArray.sort(compareFn);
      return newArray;
    });
  }

  hook(initialValue: T[] = []): UseArray<T> {
    const [state, setState] = useState<Array<T>>(initialValue ?? []);
    this.state = state;
    this.setState = setState;
    return this;
  }

  at(idx: number) {
    return this.state.at(idx);
  }

  filter(pred: Predicate<T>) {
    return this.state.filter(pred);
  }

  findIndex(pred: Predicate<T>) {
    return this.state.findIndex(pred);
  }

  indexOf(item: T) {
    return this.state.indexOf(item);
  }

  map<S>(mapFn: (value: T, index?: number, array?: T[]) => S) {
    return this.state.map<S>(mapFn);
  }

  pop() {
    const last = this.state[this.state.length - 1];
    this.setState(arr => arr.slice(0, -1));
    return last;
  }

  push(newItem: T) {
    this.setState(arr => [...arr, newItem]);
    return newItem;
  }

  pushRange(newItems: Iterable<T>) {
    return this.setState(arr => ([...arr, ...newItems]));
  }

  reduce<S>(callbackFn: (previousValue: S, currentValue: T) => S, initialValue: S) {
    return this.state.reduce(callbackFn, initialValue);
  }

  slice(start: number, end: number) {
    return this.state.slice(start, end);
  }

  splice(start: number, deleteCount: number, ...items: T[]) {
    const removed = this.state.slice(start, start + deleteCount);
    this.setState(arr => arr.splice(start, deleteCount, ...items));
    return removed;
  }

  removeAt(idx: number) {
    return this.setState(arr => arr.filter((item, i) => i !== idx));
  }

  removeRange(start: number, end: number) {
    return this.setState(arr => arr.filter((item, i) => i < start || i >= end));
  }

  update(idx: number, updatedItem: Partial<T>) {
    return this.setState(arr => {
      assign(arr[idx], updatedItem);
      return arr;
    });
  }


}
