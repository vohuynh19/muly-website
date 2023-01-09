import React from 'react';

const useDebouncedCallback = (callback: Function, delay: number, dependencies?: any[]) => {
  const timeout = React.useRef<any>();

  // Avoid error about spreading non-iterable (undefined)
  const comboDeps = dependencies ? [callback, delay, ...dependencies] : [callback, delay];

  return React.useCallback((...args: any) => {
    if (timeout.current != null) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      callback(...args);
    }, delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, comboDeps);
};

export default useDebouncedCallback;
