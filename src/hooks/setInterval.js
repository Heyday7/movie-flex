import { useEffect, useRef } from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // 렌더링과 관계 없이 callback을 기억
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      // 콜백 실행
      savedCallback.current();
    }

    // delay가 있다면 setInterval 시작
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
