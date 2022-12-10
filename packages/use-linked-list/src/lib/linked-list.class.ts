import {LinkedListNode} from "./use-linked-list.interface";
import {Predicate} from "@data-structures-react-hooks/data-structures-react-hooks-shared";

export class LinkedList<T> {

  head: LinkedListNode<T> | null = null;

  tail: LinkedListNode<T> | null = null;

  length = 0;

  constructor(initialValues?: Iterable<T>) {
    if (initialValues) {
      for (const value of initialValues) {
        this.push(value);
      }
    }
  }

  push(newItem: T): T {
    const newNode: LinkedListNode<T> = {
      value: newItem,
      next: null,
      prev: null,
    };

    if (this.tail) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    } else {
      this.tail = newNode;
      this.head = newNode;
    }

    this.length++;

    return newNode.value;
  }

  pushRange(newItems: Iterable<T>): void {
    for (const item of newItems) {
      this.push(item);
    }
  }

  pop(): T | undefined {
    if (this.tail) {
      const popped = this.tail;
      this.tail = popped.prev;
      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }
      this.length--;
      return popped.value;
    }
    return undefined;
  }

  at(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) {
      return undefined;
    }
    let current: LinkedListNode<T> | null | undefined = this.head;
    for (let i = 0; i < idx; i++) {
      current = current?.next;
    }
    return current?.value;
  }

  removeAt(idx: number): void {
    if (idx < 0 || idx >= this.length) {
      return;
    }
    let current: LinkedListNode<T> | null | undefined = this.head;
    for (let i = 0; i < idx; i++) {
      current = current?.next;
    }
    if (current) {
      if (current.prev) {
        current.prev.next = current.next;
      } else {
        this.head = current.next;
      }
      if (current.next) {
        current.next.prev = current.prev;
      } else {
        this.tail = current.prev;
      }
      this.length--;
    }
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  find(predicate: Predicate<T>): T | undefined {
    let current = this.head;
    while (current) {
      if (predicate(current.value)) {
        return current.value;
      }
      current = current.next;
    }
    return undefined;
  }

  findIndex(predicate: Predicate<T>): number {
    let current = this.head;
    let i = 0;
    while (current) {
      if (predicate(current.value)) {
        return i;
      }
      current = current.next;
      i++;
    }
    return -1;
  }

  indexOf(value: T): number {
    let current = this.head;
    let i = 0;
    while (current) {
      if (current.value === value) {
        return i;
      }
      current = current.next;
      i++;
    }
    return -1;
  }

  updateAt(idx: number, newValue: T): void {
    if (idx < 0 || idx >= this.length) {
      return;
    }
    let current: LinkedListNode<T> | null | undefined = this.head;
    for (let i = 0; i < idx; i++) {
      current = current?.next;
    }
    if (current) {
      current.value = newValue;
    }
  }

  values(): IterableIterator<T> {
    return this[Symbol.iterator]();
  }

  slice(start: number, end?: number): T[] {
    const result: T[] = [];
    let current = this.head;
    let i = 0;
    while (current) {
      if (i >= start && (end === undefined || i < end)) {
        result.push(current.value);
      }
      current = current.next;
      i++;
    }
    return result;
  }

  splice(start: number, deleteCount?: number, ...items: T[]): T[] {
    const result: T[] = [];
    let current = this.head;
    let i = 0;
    while (current) {
      if (i >= start && (deleteCount === undefined || i < start + deleteCount)) {
        result.push(current.value);
        if (current.prev) {
          current.prev.next = current.next;
        } else {
          this.head = current.next;
        }
        if (current.next) {
          current.next.prev = current.prev;
        } else {
          this.tail = current.prev;
        }
        this.length--;
      }
      current = current.next;
      i++;
    }
    if (items.length > 0) {
      current = this.head;
      i = 0;
      while (current) {
        if (i === start) {
          const prev = current.prev;
          for (const item of items) {
            const newNode: LinkedListNode<T> = {
              value: item,
              next: current,
              prev: prev,
            };
            if (prev) {
              prev.next = newNode;
            } else {
              this.head = newNode;
            }
            current.prev = newNode;
            this.length++;
          }
          break;
        }
        current = current.next;
        i++;
      }
    }
    return result;
  }

  *[Symbol.iterator](): Generator<T> {
    let current = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  filter(predicate: Predicate<T>): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      if (predicate(current.value)) {
        result.push(current.value);
      }
      current = current.next;
    }
    return result;
  }
}
