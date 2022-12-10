import {Predicate, UseLinearDataStructureClass} from "@data-structures-react-hooks/data-structures-react-hooks-shared";
import {Dispatch, SetStateAction} from "react";
import {IUseStack} from "./use-stack.interface";

export class UseStack<T> extends UseLinearDataStructureClass<T, Array<T>> implements IUseStack<T>{
  state: Array<T> = [];

  setState: Dispatch<SetStateAction<Array<T>>> = () => void(0);

  get current() {
    return [...this.state];
  }

  get empty() {
    return !this.state || this.state.length === 0;
  }

  get notEmpty() {
    return this.state && this.state.length > 0;
  }

  *[Symbol.iterator]() {
    for (const value of this.state.values()) {
      yield value;
    }
  }

  constructor(state: Array<T>, setState: Dispatch<SetStateAction<Array<T>>>) {
    super();
    this.state = state;
    this.setState = setState;
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
    return this.setState(array => {
      const newArray = [...array];
      const idx = newArray.findIndex(pred);
      if (idx !== -1) {
        if (typeof updatedItem === 'object') {
          array[idx] = {...array[idx], ...updatedItem};
        } else {
          array[idx] = updatedItem;
        }
      }
      return array;
    });
  }
  // return a shallow copy (for performance reasons)

  push(item: T): void {
    this.setState(arr => [...arr, item]);
  }

  pop(): T {
    const last = this.state[this.state.length - 1];
    this.setState(arr => arr.slice(0, -1));
    return last;
  }

  peek(): T {
    return this.state[this.state.length - 1];
  }

  override toString(): string {
    return this.state.toString();
  }
}
