import {useMemo, useState} from 'react';
import {IUseArray} from "./use-array.interface";
import {UseArray} from "./use-array.class";

export function useArray<T>(initial: T[] = []): IUseArray<T> {
  const [array, setArray] = useState<T[]>([...initial]);

  return useMemo(() => {
    return new UseArray(array, setArray);
  }, [array, setArray])
}
