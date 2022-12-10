import {UseDataStructure} from "./use-data-structure.class";
import {
  Comparator2,
  difference,
  differenceBy,
  intersection,
  intersectionBy,
  intersectionWith,
  ValueIteratee
} from "lodash";
import {Predicate} from "./shared.interface";


export abstract class UseLinearDataStructureClass<T, S> extends UseDataStructure<T, S> {

  difference(other: Iterable<T>): T[] {
    return difference([...this], [...other]);
  }

  differenceBy(other: Iterable<T>, by: ValueIteratee<T>): T[] {
    return differenceBy([...this], [...other], by);
  }

  entries(): IterableIterator<[number, T]> {
    return [...this].entries();
  }

  every(pred: Predicate<T>): boolean {
    for (const item of this) {
      if (!pred(item)) {
        return false;
      }
    }
    return true;
  }

  some(pred: Predicate<T>): boolean {
    for (const item of this) {
      if (pred(item)) {
        return true;
      }
    }
    return false;
  }

  includes(item: T): boolean {
    for (const i of this) {
      if (i === item) {
        return true;
      }
    }
    return false;
  }

  intersection(other: Iterable<T>): T[] {
    return intersection([...this], [...other]);
  }

  intersectionBy(other: Iterable<T>, iteratee: ValueIteratee<T>): T[] {
    return intersectionBy([...this], [...other], iteratee);
  }

  intersectionWith(other: Iterable<T>, pred: Comparator2<T, T>): T[] {
    return intersectionWith([...this], [...other], pred);
  }

  size(pred?: Predicate<T>): number {
    let count = 0;
    for (const i of this) {
      if (pred && !pred(i)) {
        continue;
      }
      count++;
    }
    return count;
  }

  values(): IterableIterator<T> {
    return [...this].values();
  }
}
