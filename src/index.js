'use strict';
import SmallInterval from './small_interval';

const waitersMap = Symbol('waitersMap');
const allWaitersStore = Symbol('allWaitersMap');
const identifier = Symbol('identifier');

class Timer {
  static setInterval(cb, interval, ...args) {
    if (!Timer[waitersMap].has(int)) {
      Timer[waitersMap].set(int, new SmallInterval(int));
    }
    let waiter = function() {
      cb(...args);
    };
    let id = Timer[identifier]++;
    Timer[waitersMap].get(int).addWaiter(waiter);
    Timer[allWaitersStore].set(id, {interval: int, waiter: waiter});
  }

  static clearInterval(id) {
    if (!Timer[allWaitersStore].has(id)) {
      return;
    }
    let waiterProp = Timer[allWaitersStore].get(id);
    Timer[allWaitersStore].delete(id);
    let smallInterval = Timer[waitersMap].get(waiterProp.interval);
    smallInterval.removeWaiter(waiterProp.waiter);
    if (smallInterval.getWaitersCount() === 0) {
      Timer[waitersMap].delete(waiterProp.interval);
    }
  }
}

Timer[waitersMap] = new Map();

Timer[allWaitersStore] = new Map();

Timer[identifier] = 1;


export default Timer;