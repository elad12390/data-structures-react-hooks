import {IUseLinearDataStructure} from "@data-structures-react-hooks/data-structures-react-hooks-shared";

export type IUseStack<T> = IUseLinearDataStructure<T, T[]> & {
  push: (item: T) => void;
  pop: () => T;
  peek: () => T;
}
