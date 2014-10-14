# LoopBack Phase

Hook into the various phases of a LoopBack application.

## Installation

    npm install loopback-phase

## Usage

```js
var PhaseSet = require('loopback-phase').PhaseSet;
var set = new PhaseSet();
set.addInOrder(['first', 'second', 'third']);

var first = set.findById('first');
var second = set.findById('second');

first.register(function(cb) {
  console.log('this is the first phase!');
});

second.register(function(cb) {
  console.log('this is the second phase!');
});

first.launch();
```

See [API docs](http://apidocs.strongloop.com/loopback-phase/) for
complete API reference.

## License

This module is provided under dual MIT/StrongLoop license.  See [LICENSE](LICENSE) for details.
