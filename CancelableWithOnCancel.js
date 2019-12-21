import { AbortError } from './CustomError.js';

export class CancelablePromise extends Promise {
  constructor(executor) {
    super((resolve, reject) => {
      let onCancel = null;

      const wrapCancel = callback => val => {
        if (this.cancelled) {
          if (onCancel) {
            onCancel();
            onCancel = null;
          }
          reject(new AbortError('Cancelled'));
          return;
        }
        callback(val);
      };

      executor(
        wrapCancel(resolve),
        wrapCancel(reject),
        callback => {
          onCancel = callback;
        }
      );
    });

    this.cancelled = false;
  }

  cancel() {
    this.cancelled = true;
  }
}