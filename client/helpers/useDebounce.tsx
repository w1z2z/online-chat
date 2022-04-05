import {useCallback, useRef} from "react";

// interface Timer {
//   current: number | null,
// }

function useDebounce (callback: any, delay: number) {
  const timer = useRef<any>(null)
  return useCallback((...args) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    timer.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay]);
}

export default useDebounce;