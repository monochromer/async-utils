export class Thenable {
  constructor() {
    this.next = null;
  }

  then(resolve, reject) {
    this.resolve = resolve;
    this.reject = reject;
    return this.next = new Thenable();
  }

  reject(error) {
    throw typeof error === 'string' ? new Error(error) : error
  }

  resolve(value) {
    if (this.resolve) {
      try {
        const next = this.resolve(value);
        if (next) {
          if (next.then) {
            next.then(value => {
              this.next.resolve(value);
            });
          } else {
            this.next.resolve(next);
          }
        }
      } catch (error) {
        if (this.reject) {
          this.reject(error);
        }
      }
    }
  }
}
