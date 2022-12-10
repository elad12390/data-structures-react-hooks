import {render} from "@testing-library/react";
import * as React from "react";
import {useEffect} from "react";
import {useStack} from "./use-stack";

describe('useStack', () => {
  describe('Basic Tests', () => {

    it('hook should not crash', () => {
      const Test = () => {
        useStack([1, 2, 3]);
        return (<></>);
      }

      render(<Test/>);
    });

    it('should have all base methods', () => {
      const Test = () => {
        const hookValue = useStack([1,2,3]);

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
        const stack = useStack([1, 2, 3]);

        expect(stack).toHaveProperty('push');
        expect(stack).toHaveProperty('pop');
        expect(stack).toHaveProperty('peek');

        expect(stack[Symbol.iterator]).toBeDefined();
        expect(stack.toString).toBeDefined();

        return (<></>);
      }

      render(<Test/>);
    });
  })

  describe('Base Method Tests', () => {
    it('should return current array shallow copy', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        expect(stack.current).toEqual([1, 2, 3]);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should merge arrays', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        useEffect(() => {
          stack.merge([4, 5, 6]);
          setTimeout(() => {
            expect(stack.current).toEqual([1, 2, 3, 4, 5, 6]);
          }, 0)
        }, [])
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct empty', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        expect(stack.empty).toEqual(false);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct notEmpty', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        expect(stack.notEmpty).toEqual(true);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct difference', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        expect(stack.difference([1, 2])).toEqual([3]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct differenceBy', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        expect(stack.differenceBy([1, 2], (value) => value)).toEqual([3]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct entries', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        expect(Array.from(stack.entries())).toEqual([[0, 1], [1, 2], [2, 3]]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct every', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        expect(stack.every((value) => value > 0)).toEqual(true);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct find', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        expect(stack.find((value) => value > 1)).toEqual(2);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct findAndUpdate', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        useEffect(() => {
          stack.findAndUpdate((value) => value > 1, 4);

          setTimeout(() => {
            expect(stack).toBe([1, 4, 3]);
          }, 0);
        }, [])
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct intersection', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        expect(stack.intersection([1, 2])).toEqual([1, 2]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct intersectionBy', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        expect(stack.intersectionBy([1, 2], (value) => value)).toEqual([1, 2]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct intersectionWith', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        expect(stack.intersectionWith([1, 2], (a, b) => a === b)).toEqual([1, 2]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct remove', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        useEffect(() => {
          stack.remove(2);
          setTimeout(() => {
            expect(stack).toBe([1, 3]);
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct removeAll', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        useEffect(() => {
          stack.removeAll();
          setTimeout(() => {
            expect(stack).toBe([]);
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct set', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        useEffect(() => {
          stack.set([4, 5, 6]);
          setTimeout(() => {
            expect(stack).toBe([4, 5, 6]);
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct size', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        expect(stack.size()).toBe(3);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct size with predicate', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        expect(stack.size((value) => value > 1)).toBe(2);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct some', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        expect(stack.some((value) => value === 2)).toBe(true);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct values', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        expect(Array.from(stack.values())).toEqual([1, 2, 3]);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should be able to iterate over the array', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        useEffect(() => {
          const result = [];
          for (const value of Array.from(stack)) {
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
        const stack = useStack([2, 1, 3]);
        useEffect(() => {
          stack.sort((a, b) => a - b);
          setTimeout(() => {
            expect(stack).toBe([1, 2, 3]);
          },0);
        }, [])
        return (<></>);
      }

      render(<Test/>);
    });
  });

  describe('Stack Extra Methods Tests', () => {
    it('should push to the stack', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        useEffect(() => {
          stack.push(4);
          setTimeout(() => {
            expect(stack).toEqual([1, 2, 3, 4]);
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should pop from the stack', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        useEffect(() => {
          stack.pop();
          setTimeout(() => {
            expect(stack).toEqual([1, 2]);
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should peek at the stack', () => {
      const Test = () => {
        const stack = useStack([1, 2, 3]);
        useEffect(() => {
          expect(stack.peek()).toEqual(3);
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
  });
});
