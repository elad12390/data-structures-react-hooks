import { useArray } from './use-array';
import { render } from "@testing-library/react";
import { useEffect } from 'react';
import * as React from 'react';

describe('useArray', () => {
  describe('Basic Tests', () => {

    it('hook should not crash', () => {
      const Test = () => {
        useArray([1, 2, 3]);
        return (<></>);
      }

      render(<Test/>);
    });

    it('hook should return all required methods', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);

        expect(array).toHaveProperty('current');
        expect(array).toHaveProperty('length');
        expect(array).toHaveProperty('empty');
        expect(array).toHaveProperty('notEmpty');
        expect(array).toHaveProperty('at');
        expect(array).toHaveProperty('difference');
        expect(array).toHaveProperty('differenceBy');
        expect(array).toHaveProperty('entries');
        expect(array).toHaveProperty('every');
        expect(array).toHaveProperty('filter');
        expect(array).toHaveProperty('find');
        expect(array).toHaveProperty('findAndUpdate');
        expect(array).toHaveProperty('findIndex');
        expect(array).toHaveProperty('includes');
        expect(array).toHaveProperty('indexOf');
        expect(array).toHaveProperty('intersection');
        expect(array).toHaveProperty('intersectionBy');
        expect(array).toHaveProperty('intersectionWith');
        expect(array).toHaveProperty('map');
        expect(array).toHaveProperty('pop');
        expect(array).toHaveProperty('push');
        expect(array).toHaveProperty('pushRange');
        expect(array).toHaveProperty('reduce');
        expect(array).toHaveProperty('remove');
        expect(array).toHaveProperty('removeAll');
        expect(array).toHaveProperty('removeAt');
        expect(array).toHaveProperty('removeRange');
        expect(array).toHaveProperty('set');
        expect(array).toHaveProperty('size');
        expect(array).toHaveProperty('slice');
        expect(array).toHaveProperty('some');
        expect(array).toHaveProperty('sort');
        expect(array).toHaveProperty('update');
        expect(array).toHaveProperty('values');
        expect(array[Symbol.iterator]).toBeDefined();
        expect(array.toString).toBeDefined();

        return (<></>);
      }

      render(<Test/>);
    });
  })

  describe('Method Tests', () => {

    it('should return current array shallow copy', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.current).toEqual([1, 2, 3]);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct length', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.length).toEqual(3);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct empty', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.empty).toEqual(false);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct notEmpty', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.notEmpty).toEqual(true);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct at', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.at(0)).toEqual(1);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct difference', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.difference([1, 2])).toEqual([3]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct differenceBy', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.differenceBy([1, 2], (value) => value)).toEqual([3]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct entries', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(Array.from(array.entries())).toEqual([[0, 1], [1, 2], [2, 3]]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct every', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.every((value) => value > 0)).toEqual(true);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct filter', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.filter((value) => value > 1)).toEqual([2, 3]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct find', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.find((value) => value > 1)).toEqual(2);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct findAndUpdate', () => {
        const Test = () => {
          const array = useArray([1, 2, 3]);
          useEffect(() => {
            array.findAndUpdate((value) => value > 1, 4);

            setTimeout(() => {
              expect(array).toBe([1, 4, 3]);
            }, 0);
          }, [])
          return (<></>);
        }

        render(<Test/>);

    });
    it('should return correct findIndex', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.findIndex((value) => value > 1)).toEqual(1);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct includes', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.includes(1)).toEqual(true);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct indexOf', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.indexOf(1)).toEqual(0);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct intersection', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.intersection([1, 2])).toEqual([1, 2]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct intersectionBy', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.intersectionBy([1, 2], (value) => value)).toEqual([1, 2]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct intersectionWith', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.intersectionWith([1, 2], (a, b) => a === b)).toEqual([1, 2]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct map', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.map((value) => value + 1)).toEqual([2, 3, 4]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should pop the last value from the array', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        useEffect(() => {
          array.pop();

          setTimeout(() => {
            expect(array).toBe([1, 2]);
          }, 0);
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct popped value', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        useEffect(() => {
          const poppedValue = array.pop();
          expect(poppedValue).toBe(3);
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct push', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        useEffect(() => {
          array.push(4);
          setTimeout(() => {
            expect(array).toBe([1, 2, 3, 4]);
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return the value pushed after push call', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        useEffect(() => {
          const pushed = array.push(4);
          expect(pushed).toBe(4);
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct pushRange', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        useEffect(() => {
          array.pushRange([4, 5]);
          setTimeout(() => {
            expect(array).toBe([1, 2, 3, 4, 5]);
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct reduce', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.reduce((acc, value) => acc + value, 0)).toBe(6);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct remove', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        useEffect(() => {
          array.remove(2);
          setTimeout(() => {
            expect(array).toBe([1, 3]);
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct removeAll', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        useEffect(() => {
          array.removeAll();
          setTimeout(() => {
            expect(array).toBe([]);
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct removeAt', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        useEffect(() => {
          array.removeAt(1);
          setTimeout(() => {
            expect(array).toBe([1, 3]);
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct removeRange', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        useEffect(() => {
          array.removeRange(0, 1);
          setTimeout(() => {
            expect(array).toBe([3]);
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct set', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        useEffect(() => {
          array.set([4, 5, 6]);
          setTimeout(() => {
            expect(array).toBe([4, 5, 6]);
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct size', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.size()).toBe(3);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct size with predicate', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.size((value) => value > 1)).toBe(2);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct slice', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.slice(0, 1)).toEqual([1]);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct some', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array.some((value) => value === 2)).toBe(true);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct sort', () => {
      const Test = () => {
        const array = useArray([2, 1, 3]);
        useEffect(() => {
          array.sort((a, b) => a - b);
          setTimeout(() => {
            expect(array).toBe([1, 2, 3]);
          },0);
        }, [])
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct update', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        useEffect(() => {
          array.update(1, 4);
          setTimeout(() => {
            expect(array).toBe([1, 4, 3]);
          },0);
        }, [])
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct values', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(Array.from(array.values())).toEqual([1, 2, 3]);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct splice with 1 argument', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        useEffect(() => {
          array.splice(1, 2);
          setTimeout(() => {
            expect(array).toBe([1]);
          },0);
        }, [])
        return (<></>);
      }

      render(<Test/>);
    });
    it('should be able to iterate over the array', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        useEffect(() => {
          const result = [];
          for (const value of Array.from(array)) {
            result.push(value);
          }
          expect(result).toEqual([1, 2, 3]);
        }, [])
        return (<></>);
      }

      render(<Test/>);
    });
    it('should be able to return the value at a given index', () => {
      const Test = () => {
        const array = useArray([1, 2, 3]);
        expect(array[1]).toBe(2);
        return (<></>);
      }

      render(<Test/>);
    });
  });
});
