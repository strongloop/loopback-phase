var assert = require('assert');
var expect = require('chai').expect;
var Phase = require('../').Phase;

describe('Phase', function() {
  describe('phase.run(ctx, cb)', function() {
    it('should execute phase handlers', function (done) {
      var phase = new Phase();
      var called = false;
      phase.use(function(ctx, cb) {
        called = true;
        cb();
      });
      phase.run(function() {
        assert(called === true);
        done();
      });
    });

    it('should set the context for handlers', function (done) {
      var phase = new Phase();
      phase.use(function(ctx, cb) {
        expect(ctx).to.have.property('foo', 'bar');
        cb();
      });
      phase.run({foo: 'bar'}, done);
    });
  });

  describe('phase.use(handler)', function() {
    it('should add a handler that is invoked during a phase', function (done) {
      var phase = new Phase();
      var invoked = false;
      phase.use(function(ctx, cb) {
        invoked = true;
        cb();
      });
      phase.run(function() {
        expect(invoked).to.equal(true);
        done();
      });
    });
  });

  describe('phase.after(handler)', function() {
    it('should add a handler that is invoked after a phase', function (done) {
      var phase = new Phase('test');
      phase
        .use(function(ctx, cb) {
          ctx.foo = 'ba';
          cb();
        })
        .use(function(ctx, cb) {
          ctx.foo = ctx.foo + 'r';
          cb();
        });
      phase.after(function(ctx, cb) {
        assert(ctx.foo === 'bar');
        cb();
      });
      phase.run(done);
    });
  });
});
