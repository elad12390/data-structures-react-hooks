import {Predicate, UseLinearDataStructureClass} from "@data-structures-react-hooks/data-structures-react-hooks-shared";
import { Dispatch, SetStateAction } from "react";
import {IUseSet} from "./use-set.interface";

export class UseSet<T> extends UseLinearDataStructureClass<T, Set<T>> implements IUseSet<T> {
  state: Set<T> = new Set();

  setState: Dispatch<SetStateAction<Set<T>>> = () => void(0);

  constructor(state: Set<T>, setState: Dispatch<SetStateAction<Set<T>>>) {
    super();
    this.state = state;
    this.setState = setState;
  }

  get current() {
    return new Set(this.state);
  }

  get empty() {
    return !this.state || this.state.size === 0;
  }

  get notEmpty() {
    return this.state && this.state.size > 0;
  }

  *[Symbol.iterator]() {
    for (const value of this.state.values()) {
      yield value;
    }
  }

  merge(other: Set<T>) {
    return this.setState((prev) => new Set([...prev, ...other]));
  }

  find(pred: Predicate<T>) {
    return [...this.state].find(pred);
  }

  remove(item: T) {
    return this.setState(set => new Set([...set].filter(i => i !== item)));
  }

  set(iterable: Iterable<T>) {
    return this.setState(new Set(iterable));
  }
  sort() {
    return;
  }  // cant sort a set

  removeAll() {
    return this.setState(new Set());
  }

  findAndUpdate(pred: Predicate<T>, updatedItem: Partial<T>) {
    return this.setState(set => {
      const newSet = new Set(set);
      for (const value of set.values()) {
        if (pred(value)) {
          newSet.delete(value);
          if (typeof updatedItem === 'object') {
            newSet.add({...value, ...updatedItem});
          } else {
            newSet.add(updatedItem as T);
          }
        }
      }
      return newSet;
    });
  }

  add(item: T): void {
    this.setState(set => new Set([...set, item]));
  }

  addRange(items: Iterable<T>): void {
    this.setState(set => new Set([...set, ...items]));
  }

  clear(): void {
    this.setState(new Set());
  }

  delete(item: T): void {
    this.setState(set => new Set([...set].filter(i => i !== item)));
  }

  has(item: T): boolean {
    return this.state.has(item);
  }

  toString(): string {
    return this.state.toString();
  }
}
