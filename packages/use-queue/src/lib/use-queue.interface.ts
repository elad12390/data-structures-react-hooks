import {IUseLinearDataStructure} from "@data-structures-react-hooks/data-structures-react-hooks-shared";

export type IUseQueue<T> = IUseLinearDataStructure<T, T[]> & {
  enqueue: (item: T) => void;
  dequeue: () => T;
  peek: () => T;
}
