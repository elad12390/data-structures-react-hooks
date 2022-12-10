import {Predicate} from "@data-structures-react-hooks/data-structures-react-hooks-shared";

export abstract class UseDataStructure<T, S> {
  abstract current: S;
  abstract empty: boolean;
  abstract notEmpty: boolean;
  abstract find(pred: Predicate<T>) :T | undefined;
  abstract findAndUpdate(pred: Predicate<T>, updatedItem: Partial<T>): void;
  abstract remove(item: T): void;
  abstract removeAll(): void;
  abstract sort(compareFn?: (a: T, b: T) => number): void;
  abstract merge(other: S): void;
  abstract set(newCollection: Iterable<T>): void;
  abstract [Symbol.iterator](): Generator<T>;
  abstract toString(): string;
  [anySymbol: symbol]: any;
}
