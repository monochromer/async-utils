import { timeout } from './timeout.js';

export const promiseWithTimeout = (promise, time = 5000) => {
  return Promise.race([ promise, timeout(time) ])
}