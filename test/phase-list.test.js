var PhaseList = require('../').PhaseList;
var Phase = require('../').Phase;
var expect = require('chai').expect;

describe('PhaseList', function() {
  describe('phaseList.find(phaseName)', function() {
    it('should find a phase by phaseName', function() {
      var phaseList = new PhaseList();
      var phase = phaseList.add('test');
      expect(phase).to.eql(phaseList.find('test'));
    });
  });

  describe('phaseList.findOrAdd(phaseName)', function() {
    it('should always return a phase', function() {
      var phaseList = new PhaseList();
      var randomKey = Math.random().toString();
      var phase = phaseList.findOrAdd(randomKey);
      expect(phase.id).to.equal(randomKey);
    });
  });

  describe('phaseList.add(phaseName)', function() {
    it('should add a phase to the list', function() {
      var phase = new Phase('myPhase');
      var phases = new PhaseList();
      phases.add(phase);
      var result = phases.find('myPhase');
      expect(result).to.equal(phase);
    });
    it('should create a phase and add it to the list', function() {
      var phases = new PhaseList();
      phases.add('myPhase');
      var result = phases.find('myPhase');
      expect(result.id).to.equal('myPhase');
    });
    it('should create and add an array oh phases', function() {
      var phases = new PhaseList();
      phases.add(['foo', 'bar']);
      var foo = phases.find('foo');
      var bar = phases.find('bar');
      expect(foo.id).to.equal('foo');
      expect(bar.id).to.equal('bar');
    });
  });

  describe('phaseList.remove(phaseName)', function() {
    it('should remove a phase from the list', function() {
      var phase = new Phase('myPhase');
      var phases = new PhaseList();
      phases.add(phase);
      var result = phases.find('myPhase');
      expect(result).to.equal(phase);
      phases.remove(phase.id);
      expect(phases.find('myPhase')).to.equal(null);
    });

    it('should not remove any phase if phase is not in the list', function() {
      var phase = new Phase('myPhase');
      var phases = new PhaseList();
      phases.add('bar');
      var result = phases.find('myPhase');
      expect(result).to.equal(null);
      var removed = phases.remove(phase.id);
      expect(removed).to.equal(null);
      expect(phases.getPhaseNames()).to.eql(['bar']);
    });
  });

  describe('phases.toArray()', function() {
    it('should return the list of phases as an array', function() {
      var names = ['a', 'b'];
      var phases = new PhaseList();

      phases.add(names);

      var result = phases
        .toArray()
        .map(function(phase) {
          return phase.id;
        });

      expect(names).to.eql(result);
    });
  });

  describe('phaseList.run(ctx, cb)', function() {
    it('runs phases in the correct order', function(done) {
      var phases = new PhaseList();
      var called = [];

      phases.add(['one', 'two']);

      phases.find('one').use(function(ctx, cb) {
        expect(ctx.hello).to.equal('world');
        setTimeout(function() {
          called.push('one');
          cb();
        }, 1);
      });

      phases.find('two').use(function(ctx, cb) {
        called.push('two');
        cb();
      });

      phases.run({ hello: 'world' }, function(err) {
        if (err) return done(err);
        expect(called).to.eql(['one', 'two']);
        done();
      });
    });
  });

  describe('phaseList.getPhaseNames()', function() {

  });
});
