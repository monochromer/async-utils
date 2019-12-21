export class CustomError extends Error {
  constructor(message) {
    super(message);

    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = (new Error()).stack)
  }

  get name() {
    return 'CustomError'
  }
}

export class AbortError extends CustomError {
  get name() {
    return 'AbortError'
  }
}

export class TimeoutError extends CustomError {
  get name() {
    return 'TimeoutError'
  }
}