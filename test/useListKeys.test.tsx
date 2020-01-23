import '@testing-library/jest-dom/extend-expect';
import { act, cleanup, renderHook } from '@testing-library/react-hooks';
import useListKeys from '../src/useListKeys';

describe('it', () => {
  let list: string[];
  let add: (a: string, b: number) => void;
  let remove: (a: number) => void;
  let reset: (a: string[]) => void;
  let getKey: (a: number) => string;
  const initialList = ['a', 'b', 'c'];

  beforeEach(() => {
    renderHook(
      () => ({ list, add, remove, reset, getKey } = useListKeys(initialList))
    );
  });

  afterEach(() => cleanup());

  // TODO
});
