import {IUseSet} from "./use-set.interface";
import {useMemo, useState} from "react";
import {UseSet} from "./use-set.class";

export function useSet<T>(values?: readonly T[] | null): IUseSet<T> {
  const [hashSet, setHashSet] = useState<Set<T>>(new Set<T>(values));
  return useMemo(() => new UseSet(hashSet, setHashSet), [hashSet, setHashSet]);
}
