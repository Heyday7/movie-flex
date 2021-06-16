export function throttle(callback, ms = 1000) {
  let timer = null;
  return function (...args) {
    if (timer === null) {
      timer = setTimeout(() => {
        callback.apply(this, args);
        timer = null;
      }, ms);
    }
  };
}
