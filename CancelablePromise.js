import { AbortError } from './CustomError.js';

export class CancelablePromise extends Promise {
  constructor(executor) {
    super((resolve, reject) => {
      const wrapper = callback => value => {
        if (this.cancelled) {
          reject(new AbortError('Cancelled'));
          return;
        }
        callback(value)
      }

      executor(wrapper(resolve), wrapper(reject));
    });

    this.cancelled = false;
  }

  cancel() {
    this.cancelled = true;
  }
}