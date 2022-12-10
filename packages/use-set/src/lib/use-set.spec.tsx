import { useSet } from './use-set';
import {render} from "@testing-library/react";
import * as React from "react";
import {useEffect} from "react";
import {useSetFactory} from "./use-set.factory";

describe('useSet', () => {
  describe('Basic Tests', () => {
    it('hook should not crash', () => {
      const Test = () => {
        useSet();
        return (<></>);
      }

      render(<Test/>);
    });
    it('should have all base methods', () => {
      const Test = () => {
        const hookValue = useSet([1,2,3]);

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
    it('should have all extension methods', () => {
      const Test = () => {
        const hookValue = useSet([1,2,3]);

        expect(hookValue).toHaveProperty('add');
        expect(hookValue).toHaveProperty('clear');
        expect(hookValue).toHaveProperty('delete');
        expect(hookValue).toHaveProperty('addRange');
        expect(hookValue).toHaveProperty('has');

        return (<></>);
      }

      render(<Test/>);
    });
  });

  describe('Base Method Tests', () => {
    it('should return current set shallow copy', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        expect(set.current).toEqual(new Set([1, 2, 3]));
        return (<></>);
      }

      render(<Test/>);
    });
    it('should merge sets', () => {
      const Test = () => {
        const array = useSet([1, 2, 3]);
        useEffect(() => {
          array.merge(new Set([3, 4, 5, 6]));
          setTimeout(() => {
            expect(array.current).toEqual(new Set([1, 2, 3, 4, 5, 6]));
          }, 0)
        }, [])
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct empty', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        expect(set.empty).toEqual(false);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct notEmpty', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        expect(set.notEmpty).toEqual(true);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct difference', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        expect(set.difference([1, 2])).toEqual([3]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct differenceBy', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        expect(set.differenceBy([1, 2], (value) => value)).toEqual([3]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct entries', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        expect(Array.from(set.entries())).toEqual([[0, 1], [1, 2], [2, 3]]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct every', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        expect(set.every((value) => value > 0)).toEqual(true);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct find', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        expect(set.find((value) => value > 1)).toEqual(2);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct findAndUpdate', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        useEffect(() => {
          set.findAndUpdate((value) => value > 1, 4);

          setTimeout(() => {
            expect(set).toEqual(new Set([1, 4, 3]));
          }, 0);
        }, [])
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct includes', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        expect(set.includes(1)).toEqual(true);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct intersection', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        expect(set.intersection([1, 2])).toEqual([1, 2]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct intersectionBy', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        expect(set.intersectionBy([1, 2], (value) => value)).toEqual([1, 2]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct intersectionWith', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        expect(set.intersectionWith([1, 2], (a, b) => a === b)).toEqual([1, 2]);
        return (<></>);
      }

      render(<Test/>);

    });
    it('should return correct remove', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        useEffect(() => {
          set.remove(2);
          setTimeout(() => {
            expect(set).toEqual(new Set([1, 3]));
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct removeAll', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        useEffect(() => {
          set.removeAll();
          setTimeout(() => {
            expect(set).toEqual(new Set([]));
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct set', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        useEffect(() => {
          set.set([4, 5, 6]);
          setTimeout(() => {
            expect(set).toEqual(new Set([4, 5, 6]));
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct size', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        expect(set.size()).toBe(3);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct size with predicate', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        expect(set.size((value) => value > 1)).toBe(2);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct some', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        expect(set.some((value) => value === 2)).toBe(true);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct values', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        expect(Array.from(set.values())).toEqual([1, 2, 3]);
        return (<></>);
      }

      render(<Test/>);
    });
    it('should be able to iterate over the set', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        useEffect(() => {
          const result = [];
          for (const value of Array.from(set)) {
            result.push(value);
          }
          expect(result).toEqual([1, 2, 3]);
        }, [])
        return (<></>);
      }

      render(<Test/>);
    });
    it('should be able to run sort and do nothing (because order is non important in a set)', () => {
      const Test = () => {
        const set = useSet([2, 3, 2, 2, 2, 2, 1, 2, 3]);
        useEffect(() => {
          set.sort();
          setTimeout(() => {
            expect(set).toEqual(new Set([1, 2, 3]));
          }, 0)
        }, [])
        return (<></>);
      }

      render(<Test/>);
    });
  });

  describe('Set Extra Methods Tests', () => {
    it('should return correct add', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        useEffect(() => {
          set.add(4);
          setTimeout(() => {
            expect(set).toEqual(new Set([1, 2, 3, 4]));
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct add (if provided an existing item)', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        useEffect(() => {
          set.add(3);
          setTimeout(() => {
            expect(set).toEqual(new Set([1, 2, 3]));
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct addRange', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        useEffect(() => {
          set.addRange([4, 5, 6]);
          setTimeout(() => {
            expect(set).toEqual(new Set([1, 2, 3, 4, 5, 6]));
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct addRange (with duplicates)', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        useEffect(() => {
          set.addRange([3, 4, 5, 6]);
          setTimeout(() => {
            expect(set).toEqual(new Set([1, 2, 3, 4, 5, 6]));
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct clear', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        useEffect(() => {
          set.clear();
          setTimeout(() => {
            expect(set).toEqual(new Set([]));
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct delete', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        useEffect(() => {
          set.delete(2);
          setTimeout(() => {
            expect(set).toEqual(new Set([1, 3]));
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct delete (if provided an item that does not exist)', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        useEffect(() => {
          set.delete(4);
          setTimeout(() => {
            expect(set).toEqual(new Set([1, 2, 3]));
          })
        }, [])

        return (<></>);
      }

      render(<Test/>);
    });
    it('should return correct has', () => {
      const Test = () => {
        const set = useSet([1, 2, 3]);
        expect(set.has(2)).toBe(true);
        return (<></>);
      }

      render(<Test/>);
    });
  });
});
