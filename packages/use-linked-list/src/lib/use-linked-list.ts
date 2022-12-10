import {useMemo, useState} from 'react';
import {IUseLinkedList} from "./use-linked-list.interface";
import {LinkedList} from "./linked-list.class";
import {UseLinkedList} from "./use-linked-list.class";


export function useLinkedList<T>(initial: T[] = []): IUseLinkedList<T> {
  const [list, setList] = useState<LinkedList<T>>(new LinkedList(initial ?? []));

  return useMemo(() => new UseLinkedList(list, setList), [list, setList])
}
