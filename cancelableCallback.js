export const cancelableCallback = (fn) => {
  const wrapper = (...args) => {
    if (fn) return fn(...args);
  }

  wrapper.cancel = () => fn = null;

  return wrapper;
}