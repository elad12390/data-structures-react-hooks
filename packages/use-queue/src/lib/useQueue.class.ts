import {Predicate, UseLinearDataStructureClass} from "@data-structures-react-hooks/data-structures-react-hooks-shared";
import assign from "lodash.assign";
import { Dispatch, SetStateAction } from "react";

export class UseQueue<T> extends UseLinearDataStructureClass<T, Array<T>> {

  state: Array<T> = [];

  setState: Dispatch<SetStateAction<T[]>> = () => void(0);


  constructor(state: Array<T>, setState: Dispatch<SetStateAction<T[]>>) {
    super();
    this.state = state;
    this.setState = setState;
  }

// return a shallow copy (for performance reasons)
  get current() {
    return [...this.state];
  }

  get empty() {
    return !this.state || this.state.length === 0;
  }

  get notEmpty() {
    return this.state && this.state.length > 0;
  }

  merge(other: T[]) {
    return this.setState((prev) => [...prev, ...other]);
  }

  find(pred: Predicate<T>) {
    return this.state.find(pred);
  }

  remove(item: T) {
    return this.setState(arr => arr.filter(i => i !== item));
  }

  set(newArray: Iterable<T>) {
    return this.setState([...newArray]);
  }

  sort(compareFn?: (a: T, b: T) => number) {
    return this.setState(arr => [...arr].sort(compareFn));
  }

  removeAll() {
    return this.setState([]);
  }

  findAndUpdate(pred: Predicate<T>, updatedItem: Partial<T>) {
    return this.setState(arr => {
      const idx = arr.findIndex(pred);
      if (idx !== -1) {
        assign(arr[idx], updatedItem)
      }
      return [...arr];
    });
  }

  * [Symbol.iterator]() {
    for (const value of this.state.values()) {
      yield value;
    }
  }

  enqueue(item: T): void {
    this.setState(arr => [item, ...arr]);
  }

  dequeue(): T {
    const last = this.state[this.state.length - 1];
    this.setState(arr => arr.slice(0, -1));
    return last;
  }

  peek(): T {
    return this.state[this.state.length - 1];
  }

  toString(): string {
    throw new Error("Method not implemented.");
  }
}
