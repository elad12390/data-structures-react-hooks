import {Predicate, IUseLinearDataStructure} from '@data-structures-react-hooks/data-structures-react-hooks-shared';

export type IUseArray<T> = IUseLinearDataStructure<T, Array<T>> & {
  readonly length: number;
  at: (idx: number) => T | undefined;
  filter: (pred: Predicate<T>) => T[];
  findIndex: (pred: Predicate<T>) => number;
  indexOf: (item: T) => number;
  map: (mapFn: (value: T, index?: number, array?: T[]) => T) => Array<T>;
  pop: () => T;
  push: (newItem: T) => T;
  pushRange: (newItems: Iterable<T>) => void;
  reduce: <S>(reduceFunction: (previousValue: S, currentValue: T) => S, initialValue: S) => S;
  removeAt: (idx: number) => void;
  removeRange: (start: number, end: number) => void;
  slice: (start: number, end: number) => T[];
  splice: (start: number, deleteCount: number, ...items: T[]) => T[];
  update: (idx: number, updatedItem: Partial<T>) => void;
  [idx: number]: T;
}
