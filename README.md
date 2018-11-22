# LoopBack Phase

Hook into the various phases of a LoopBack application.

This module is in Active LTS mode, new features are no longer accepted.
(See [Module Long Term Support Policy](#module-long-term-support-policy) below.)
LoopBack 3 users looking for new features are encouraged to upgrade to LoopBack 4. Refer to [loopback-next#1849](https://github.com/strongloop/loopback-next/issues/1849) for more information on how to upgrade.

## Installation

    npm install loopback-phase

## Usage

```js
var PhaseList = require('loopback-phase').PhaseList;
var phases = new PhaseList();
phases.add('first');
phases.add('second');
phases.add('third');

var first = phases.find('first');
var second = phases.find('second');

first.use(function(ctx, cb) {
  console.log('this is the first phase!');
  cb();
});

second.use(function(ctx, cb) {
  console.log('this is the second phase!');
  cb();
});

phases.run(ctx);
```

See [API docs](http://apidocs.strongloop.com/loopback-phase/) for
complete API reference.

## License

[MIT](LICENSE).

## Module Long Term Support Policy

This module adopts the [Module Long Term Support (LTS)](http://github.com/CloudNativeJS/ModuleLTS) policy, with the following End Of Life (EOL) dates:

| Version | Status          | Published | EOL      |
| ------- | --------------- | --------- | -------- |
| 3.x     | Active LTS      | Dec 2016  | Dec 2019 |
| 1.x     | Maintenance LTS | Oct 2014  | Apr 2019 |

Learn more about our LTS plan in the [docs](https://loopback.io/doc/en/contrib/Long-term-support.html).