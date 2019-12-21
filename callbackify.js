export const callbackify = fn => (...args) => {
  const callback = args.pop();

  fn(...args)
    .then(value => { callback(null, value); })
    .catch(callback);
};