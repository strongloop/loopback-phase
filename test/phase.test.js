var assert = require('assert');
var expect = require('chai').expect;
var Phase = require('../').Phase;

describe('Phase', function () {
  describe('phase.launch(ctx, cb)', function () {
    it('should execute phase handlers', function (done) {
      var phase = new Phase();
      var called = false;
      phase.use(function(cb) {
        called = true;
        cb();
      });
      phase.launch(function() {
        assert(called === true);
        done();
      });
    });

    it('should set the context for handlers', function (done) {
      var phase = new Phase();
      phase.use(function(cb) {
        expect(this).to.have.property('foo', 'bar');
        cb();
      });
      phase.launch({foo: 'bar'}, done);
    });
  });

  describe('phase.use(handler)', function () {
    it('should add a handler that is invoked during a phase', function (done) {
      var phase = new Phase();
      var invoked = false;
      phase.use(function(cb) {
        invoked = true;
        cb();
      });
      phase.launch(function() {
        expect(invoked).to.equal(true);
        done();
      });
    });
  });

  describe('phase.after(handler)', function () {
    it('should add a handler that is invoked after a phase', function (done) {
      var phase = new Phase('test');
      phase
        .use(function(cb) {
          this.foo = 'ba';
          cb();
        })
        .use(function(cb) {
          this.foo = this.foo + 'r';
          cb();
        });
      phase.after(function(cb) {
        assert(this.foo === 'bar');
        cb();
      });
      phase.launch(done);
    });
  });

  describe('phase.next', function () {
    it('should be used to launch the next phase', function (done) {
      var firstPhaseComplete = false;
      var secondPhaseComplete = false;
      var firstPhase = new Phase();
      var secondPhase = new Phase();

      firstPhase.next = secondPhase;

      firstPhase.after(function(cb) {
        expect(firstPhaseComplete).to.equal(false);
        expect(secondPhaseComplete).to.equal(false);
        firstPhaseComplete = true;
        cb();
      });

      secondPhase.after(function(cb) {
        expect(firstPhaseComplete).to.equal(true);
        expect(secondPhaseComplete).to.equal(false);
        secondPhaseComplete = true;
        cb();
      });

      firstPhase.launch(function() {
        expect(firstPhaseComplete).to.equal(true);
        expect(secondPhaseComplete).to.equal(true);
        done();
      });
    });
  });
});
