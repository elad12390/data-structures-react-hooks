import {useMemo, useState} from "react";
import {useQueueFactory} from "./use-queue.factory";
import {IUseQueue} from "./use-queue.interface";

export function useQueue<T>(initialValues?: T[]): IUseQueue<T> {
  const [queue, setQueue] = useState<T[]>(initialValues ?? []);
  return useMemo(() => useQueueFactory(queue, setQueue), [queue, setQueue]);
}
