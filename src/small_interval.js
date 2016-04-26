'use strict';
/**
 * Created by numminorihsf on 26.04.16.
 */

const waiters = Symbol('waiters');
const interval = Symbol('interval');
const intervalObject = Symbol('intervalObject');

class SmallInterval {
  constructor(int) {
    this[waiters] = new Set();
    this[interval] = int;
  }
  destroy() {
    this[waiters].clear();
    clearInterval(this[intervalObject]);
  }
  addWaiter(cb) {
    if (this[waiters].size === 0) {
      this[intervalObject] = setInterval(() => {
        this[waiters].forEach((waiter) => {
          waiter();
        });
      }, this[interval]);
    }
    this[waiters].add(cb);
  }
  removeWaiter(cb) {
    this[waiters].delete(cb);
    if (this[waiters].size === 0) {
      clearInterval(this[intervalObject]);
    }
  }
  getWaitersCount() {
    return this[waiters].size;
  }
}

export default SmallInterval;