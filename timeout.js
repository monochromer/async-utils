import { TimeoutError } from './CustomError.js';

export const timeout = (time, timeoutMessage = 'It\'s timeout') =>
  new Promise((resolve, reject) => {
    setTimeout(reject, time, new TimeoutError(timeoutMessage))
  })