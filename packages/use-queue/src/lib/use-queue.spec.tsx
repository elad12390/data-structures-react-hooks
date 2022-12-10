import {render} from "@testing-library/react";
import * as React from "react";
import {useEffect} from "react";
import {useQueue} from "./use-queue";

describe('useQueue', () => {
  describe('Basic Tests', () => {

    it('hook should not crash', () => {
      const Test = () => {
        useQueue([1, 2, 3]);
        return (<></>);
      }

      render(<Test/>);
    });

    it('should have all base methods', () => {
      const Test = () => {
        const hookValue = useQueue([1,2,3]);

        expect(hookValue).toHaveProperty('current');
        expect(hookValue).toHaveProperty('empty');
        expect(hookValue).toHaveProperty('notEmpty');
        expect(hookValue).toHaveProperty('difference');
        expect(hookValue).toHaveProperty('differenceBy');
        expect(hookValue).toHaveProperty('entries');
        expect(hookValue).toHaveProperty('every');
        expect(hookValue).toHaveProperty('find');
        expect(hookValue).toHaveProperty('findAndUpdate');
        expect(hookValue).toHaveProperty('includes');
        expect(hookValue).toHaveProperty('intersection');
        expect(hookValue).toHaveProperty('intersectionBy');
        expect(hookValue).toHaveProperty('intersectionWith');
        expect(hookValue).toHaveProperty('remove');
        expect(hookValue).toHaveProperty('removeAll');
        expect(hookValue).toHaveProperty('set');
        expect(hookValue).toHaveProperty('size');
        expect(hookValue).toHaveProperty('some');
        expect(hookValue).toHaveProperty('sort');
        expect(hookValue).toHaveProperty('values');
        expect(hookValue[Symbol.iterator]).toBeDefined();
        expect(hookValue.toString).toBeDefined();

        return (<></>);
      }

      render(<Test/>);
    });

    it('should have extra methods', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);

        expect(queue).toHaveProperty('enqueue');
        expect(queue).toHaveProperty('dequeue');
        expect(queue).toHaveProperty('peek');

        expect(queue[Symbol.iterator]).toBeDefined();
        expect(queue.toString).toBeDefined();

        return (<></>);
      }

      render(<Test/>);
    });
  })

  describe('Base Method Tests', () => {
    it('should return current array shallow copy', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        expect(queue.current).toEqual([1, 2, 3]);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should merge arrays', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        useEffect(() => {
          queue.merge([4, 5, 6]);
          setTimeout(() => {
            expect(queue.current).toEqual([1, 2, 3, 4, 5, 6]);
          }, 0)
        }, [])
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct empty', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        expect(queue.empty).toEqual(false);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct notEmpty', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        expect(queue.notEmpty).toEqual(true);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct difference', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        expect(queue.difference([1, 2])).toEqual([3]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct differenceBy', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        expect(queue.differenceBy([1, 2], (value) => value)).toEqual([3]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct entries', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        expect(Array.from(queue.entries())).toEqual([[0, 1], [1, 2], [2, 3]]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct every', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        expect(queue.every((value) => value > 0)).toEqual(true);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct find', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        expect(queue.find((value) => value > 1)).toEqual(2);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct findAndUpdate', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        useEffect(() => {
          queue.findAndUpdate((value) => value > 1, 4);

          setTimeout(() => {
            expect(queue).toBe([1, 4, 3]);
          }, 0);
        }, [])
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct intersection', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        expect(queue.intersection([1, 2])).toEqual([1, 2]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct intersectionBy', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        expect(queue.intersectionBy([1, 2], (value) => value)).toEqual([1, 2]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct intersectionWith', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        expect(queue.intersectionWith([1, 2], (a, b) => a === b)).toEqual([1, 2]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct remove', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        useEffect(() => {
          queue.remove(2);
          setTimeout(() => {
            expect(queue).toBe([1, 3]);
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct removeAll', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        useEffect(() => {
          queue.removeAll();
          setTimeout(() => {
            expect(queue).toBe([]);
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct set', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        useEffect(() => {
          queue.set([4, 5, 6]);
          setTimeout(() => {
            expect(queue).toBe([4, 5, 6]);
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct size', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        expect(queue.size()).toBe(3);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct size with predicate', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        expect(queue.size((value) => value > 1)).toBe(2);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct some', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        expect(queue.some((value) => value === 2)).toBe(true);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct values', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        expect(Array.from(queue.values())).toEqual([1, 2, 3]);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should be able to iterate over the array', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        useEffect(() => {
          const result = [];
          for (const value of Array.from(queue)) {
            result.push(value);
          }
          expect(result).toEqual([1, 2, 3]);
        }, [])
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct sort', () => {
      const Test = () => {
        const queue = useQueue([2, 1, 3]);
        useEffect(() => {
          queue.sort((a, b) => a - b);
          setTimeout(() => {
            expect(queue).toBe([1, 2, 3]);
          },0);
        }, [])
        return (<></>);
      }

      render(<Test/>);
    });
  });

  describe('Queue Extra Methods Tests', () => {
    it('should enqueue in a new item', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        useEffect(() => {
          queue.enqueue(4);
          setTimeout(() => {
            expect(queue).toEqual([4, 1, 2, 3]);
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should dequeue an item', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        useEffect(() => {
          const item = queue.dequeue();
          expect(item).toBe(3);
          setTimeout(() => {
            expect(queue).toEqual([1, 2]);
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should peek at the queue', () => {
      const Test = () => {
        const queue = useQueue([1, 2, 3]);
        useEffect(() => {
          expect(queue.peek()).toEqual(3);
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
  });
});
