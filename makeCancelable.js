import { AbortError } from './CustomError.js';

export const makeCancelable = (promise, abortMessage = 'Promise was cancelled') => {
  let isCancelled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      value => isCancelled ? reject(new AbortError(abortMessage)) : resolve(value),
      error => isCancelled ? reject(new AbortError(abortMessage)) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      isCancelled = true;
    },
  };
};