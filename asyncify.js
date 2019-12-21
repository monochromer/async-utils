export const asyncify = fn => (...args) => {
  const callback = args.pop();

  setTimeout(() => {
    try {
      const result = fn(...args);
      result instanceof Error ? callback(result) : callback(null, result);
    } catch (error) {
      callback(error);
    }
  }, 0);
};