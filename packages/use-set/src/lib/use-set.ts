import {IUseSet} from "./use-set.interface";
import {useMemo, useState} from "react";
import {useSetFactory} from "./use-set.factory";

export function useSet<T>(values?: readonly T[] | null): IUseSet<T> {
  const [hashSet, setHashSet] = useState<Set<T>>(new Set<T>(values));
  return useMemo(() => useSetFactory(hashSet, setHashSet), [hashSet, setHashSet]);
}
