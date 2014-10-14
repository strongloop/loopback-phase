# LoopBack Phase

Hook into the various phases of a LoopBack application.

## Installation

    npm install loopback-phase

## Usage

```js
var loopback = require('loopback');
var app = loopback();

app.phase('my-phase').after(function(cb) {
  console.log('my-phase is complete');
  cb();
});

app.phase('my-phase').launch();
```

See [API docs](http://apidocs.strongloop.com/loopback-phase/) for
complete API reference.

## License

This module is provided under dual MIT/StrongLoop license.  See [LICENSE](LICENSE) for details.
