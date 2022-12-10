import {useMemo, useState} from 'react';
import {IUseArray} from "./use-array.interface";
import {useArrayFactory} from "./use-array.factory";


export function useArray<T>(initial: T[] = []): IUseArray<T> {
  const [array, setArray] = useState<T[]>([...initial]);

  return useMemo(() => {
    return useArrayFactory(array, setArray);
  }, [array, setArray])
}
