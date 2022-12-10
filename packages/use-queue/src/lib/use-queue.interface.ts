import {UseLinearDataStructure} from "@data-structures-react-hooks/data-structures-react-hooks-shared";

export type IUseQueue<T> = UseLinearDataStructure<T, T[]> & {
  enqueue: (item: T) => void;
  dequeue: () => T;
  peek: () => T;
}
