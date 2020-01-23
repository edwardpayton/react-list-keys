import React from 'react';

declare global {
  interface Window {
    msCrypto: Crypto;
  }
}

function newUid() {
  let size = 10;
  let id = '';

  const chars =
    'Uint8ArdomValuesObj012345679BCDEFGHIJKLMNPQRSTWXYZ_cfghkpqvwxyz-';
  const browserCrypto = window.crypto || window['msCrypto'];
  const random = browserCrypto.getRandomValues(new Uint8Array(size));

  while (size-- > 0) id += chars[random[size] & 63]; // eslint-disable-line no-bitwise, no-param-reassign

  return id;
}

export interface ListKeysReturn<T> {
  list: T[];
  add: (obj: T, position: number) => void;
  remove: (itemIndex: number) => void;
  reset: (newList: T[]) => void;
  getKey: (index: number) => string;
}

function useListKeys<T>(initialList: T[] = []): ListKeysReturn<T> {
  const keys = React.useRef<string[]>([]);

  const setKey = React.useCallback((index: number) => {
    const ref = newUid();
    keys.current.splice(index, 0, ref);
  }, []);

  const initialState = () => {
    initialList.forEach((_, index) => setKey(index));
    return initialList || [];
  };

  const [list, setList] = React.useState(initialState);

  const getKey = (index: number) => keys.current[index];

  const add = (obj: T, position: number) => {
    setList(currentList => {
      const newList = [...currentList];
      newList.splice(position, 0, obj);
      setKey(position);
      return newList;
    });
  };

  const remove = (itemIndex: number) => {
    setList(currentList => {
      const newList = [...currentList];
      newList.splice(itemIndex, 1);

      try {
        keys.current.splice(itemIndex, 1);
      } catch (e) {
        throw new Error(`There was a problem removing a list item: ${e}`);
      }
      return newList;
    });
  };

  const reset = (newList: T[] = []) => {
    keys.current = [];
    setList(() => {
      newList.forEach((_, index) => setKey(index));
      return newList;
    });
  };

  return {
    list,
    add,
    remove,
    reset,
    getKey,
  };
}

export default useListKeys;
