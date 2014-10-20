var phaseOrder = [
  'initial',
  'preprocess',
  'parse',
  'respond'
];

var express = require('express');
var app = express();
var phases = new PhaseList();
phases.add(phaseOrder);

app.use(function(req, res, next) {
  phases.find('initial').launch({
    req: req,
    res: res
  }, next);
});

phases.find('preprocess').register(function(cb) {
  loopback.compress()(this.req, this.res, cb);
});

app.listen(3000);
