import {useMemo, useState} from 'react';
import {IUseLinkedList} from "./use-linked-list.interface";
import {useLinkedListFactory} from "./use-linked-list.factory";
import {LinkedList} from "./linked-list.model";


export function useLinkedList<T>(initial: T[] = []): IUseLinkedList<T> {
  const [list, setList] = useState<LinkedList<T>>(new LinkedList(initial ?? []));

  return useMemo(() => {
    return useLinkedListFactory(list, setList);
  }, [list, setList])
}
