import {useMemo, useState} from "react";
import {useStackFactory} from "./use-stack.factory";
import {IUseStack} from "./use-stack.interface";

export function useStack<T>(initialValues?: T[]): IUseStack<T> {
  const [stack, setStack] = useState<T[]>(initialValues ?? []);
  return useMemo(() => useStackFactory(stack, setStack), [stack, setStack]);
}
