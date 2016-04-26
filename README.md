uniq-interval
============

Module provide `#setInterval()` and `#clearInterval()` methods that use unique setInterval 
for many intervals if they have similar interval value.


## Installation

```sh
npm install uniq-interval --save
```

## Usage

The most simple usage is:

```javascript

var interval = require('uniq-interval');

var tmp1 = interval.setInterval(function(){
  console.log('interval1');
}, 1000);

var tmp2 = interval.setInterval(function(){
  console.log('interval2');
}, 1000);

setTimeout(function(){
  interval.clearInterval(tmp1);
  setTimeout(function(){
    interval.clearInterval(tmp2);
  }, 10000);
}, 10000);

```

Example time-line (interval is ~ 2 ms):

Time                                         | 0 | 1 | 2        | 3   | 4             | 5   | ...
---------------------------------------------|---|---|----------|-----|---------------|-----|-----
`setInterval(callback1, 2)`                  | s |   |          |     |               |     | ...
`setInterval(callback2, 2)`                  |   | s |          |     |               |     | ...
`setInterval(callback3, 2)`                  |   |   | s        |     |               |     | ...
Execute if use `interval#setInterval(cb)`    |   |   | cb1, cb2 |     | cb1, cb2, cb3 |     | ...
Execute if use `windowTimer#setInterval(cb)` |   |   | cb1      | cb2 | cb1, cb3      | cb2 | ...




### interval#setInterval(callback, interval [, arg1][, arg2][, ...])

This method provide same api as `windowTimer#setInterval()` in browser or `Timers#setInterval()` in node.js.

It returning id of interval to use with `interval#clearInterval()`.

### interval#clearInterval(interval)

This method provide same api as `windowTimer#clearInterval()` in browser or `Timers#clearInterval()` in node.js.


## Configurating

`uniqRequest` waits 2 parameters:

`var uniqRequest = require('uniq-request')(options, uniqStringCalc);`

`options` is an object, that provides paths for transport data from and into request, response objects.

`uniqStringCalc` is a function that should calculate some string to make request uniq. By default it is:

```
function(req, res){
  return req.method+':'+req.originalPath;
};
```

If `uniqStringCalc` has 3 arguments, this function can be async, than 3rd argument will be an callback function.
First arg on callback function is an error object. Second should be a string to unify request.

### Options


Options is an Object with unnecessary fields:

* `.source` _String_ - Path on object, were output data exist. Default: `'res.locals'`. It means, 
that module will get `res.locals` and try to returning it as result after some work.
  * You can use `'req'` or `'request'` as request object link.
  * You can use `'res'` or `'response'` as response object link.
  * If no such route in object, module will return error to express.
* `.dest` _String_ - Path on object, to put result data. Default `'res.locals'`.
  * Linking to object is like on `.source`
  * If no such route in object, module will create it.



## LICENSE - "MIT License"

Copyright (c) 2016 Konstantine Petryaev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.