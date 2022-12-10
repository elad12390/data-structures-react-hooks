import {useMemo, useState} from "react";
import {IUseQueue} from "./use-queue.interface";
import {UseQueue} from "./useQueue.class";

export function useQueue<T>(initialValues?: T[]): IUseQueue<T> {
  const [queue, setQueue] = useState<T[]>(initialValues ?? []);
  return useMemo(() => new UseQueue(queue, setQueue), [queue, setQueue]);
}
