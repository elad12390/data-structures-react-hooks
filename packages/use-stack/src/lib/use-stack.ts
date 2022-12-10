import {useMemo, useState} from "react";
import {IUseStack} from "./use-stack.interface";
import {UseStack} from "./use-stack.class";

export function useStack<T>(initialValues?: T[]): IUseStack<T> {
  const [stack, setStack] = useState<T[]>(initialValues ?? []);
  return useMemo(() => new UseStack(stack, setStack), [stack, setStack]);
}
