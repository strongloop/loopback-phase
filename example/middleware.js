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
  phases.find('initial').run({
    req: req,
    res: res
  }, next);
});

phases.find('preprocess').use(function(ctx, cb) {
  loopback.compress()(ctx.req, ctx.res, cb);
});

app.listen(3000);
