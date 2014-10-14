var phaseOrder = [
  'initial',
  'preprocess',
  'parse',
  'respond'
];

var express = require('express');
var app = express();
var phases = new PhaseSet();
phases.addInOrder(phaseOrder);

app.use(function(req, res, next) {
  phases.findById('initial').launch({
    req: req,
    res: res
  }, next);
});

phases.findById('preprocess').register(function(cb) {
  loopback.compress()(this.req, this.res, cb);
});

app.listen(3000);
