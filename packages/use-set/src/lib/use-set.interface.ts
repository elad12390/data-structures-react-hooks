import {UseLinearDataStructure} from "@data-structures-react-hooks/data-structures-react-hooks-shared";

export type IUseSet<T> = UseLinearDataStructure<T, Set<T>> & {
  add: (item: T) => void;
  addRange: (items: Iterable<T>) => void;
  clear: () => void;
  delete: (item: T) => void;
  has: (item: T) => boolean;
}
