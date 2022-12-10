import { dataStructuresReactHooksShared } from './data-structures-react-hooks-shared';
import {render} from "@testing-library/react";
import * as React from "react";
import {IUseLinearDataStructure} from "./models";

export const itShouldReturnAllBaseMethods = <T, S>(hook: () => IUseLinearDataStructure<T, S>) => {

  it('hook should return all base methods', () => {
    const Test = () => {
      const hookValue = hook();

      expect(hookValue).toHaveProperty('current');
      expect(hookValue).toHaveProperty('length');
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
      expect(hookValue).toHaveProperty('splice');
      expect(hookValue).toHaveProperty('some');
      expect(hookValue).toHaveProperty('sort');
      expect(hookValue).toHaveProperty('values');
      expect(hookValue[Symbol.iterator]).toBeDefined();
      expect(hookValue.toString).toBeDefined();

      return (<></>);
    }

    render(<Test/>);
  });

}
describe('dataStructuresReactHooksShared', () => {
  it('should work', () => {
    expect(dataStructuresReactHooksShared()).toEqual(
      'data-structures-react-hooks-shared'
    );
  });
});
