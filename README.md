# LoopBack Phase

**⚠️ LoopBack 3 is in Maintenance LTS mode, only critical bugs and critical
security fixes will be provided. (See
[Module Long Term Support Policy](#module-long-term-support-policy) below.)**

We urge all LoopBack 3 users to migrate their applications to LoopBack 4 as
soon as possible. Refer to our
[Migration Guide](https://loopback.io/doc/en/lb4/migration-overview.html)
for more information on how to upgrade.

## Overview

Hook into the various phases of a LoopBack application.

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
| 3.x     | Maintenance LTS | Dec 2016  | Dec 2020 |
| 1.x     | End-of-Life     | Oct 2014  | Apr 2019 |

Learn more about our LTS plan in the [docs](https://loopback.io/doc/en/contrib/Long-term-support.html).
