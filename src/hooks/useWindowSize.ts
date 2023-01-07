import { useState, useEffect } from 'react';

const useWindowSizes = () => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
};

export default useWindowSizes;
