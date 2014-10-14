var PhaseSet = require('../').PhaseSet;
var expect = require('chai').expect;

describe('PhaseSet', function () {
  describe('phaseSet.findById(id)', function() {
    it('should find a phase by id', function () {
      var phaseSet = new PhaseSet();
      var phase = phaseSet.add('test');
      expect(phase).to.eql(phaseSet.findById('test'));
    });
  });

  describe('phaseSet.addInOrder(phaseOrder)', function () {
    it('should append the phases and order them', function () {
      var order = ['first', 'second'];
      var phaseSet = new PhaseSet();
      phaseSet.addInOrder(order);
      expect(phaseSet.findById('first').next.id).to.equal('second');
      var phaseNames = phaseSet.toArray().map(function(phase) {
        return phase.id;
      });
      expect(phaseNames).to.eql(order);
    });
  });

  describe('phaseSet.findOrAdd(phaseName)', function () {
    it('should always return a phase', function () {
      var phaseSet = new PhaseSet();
      var randomKey = Math.random().toString();
      var phase = phaseSet.findOrAdd(randomKey);
      expect(phase.id).to.equal(randomKey);
    });
  });
});
