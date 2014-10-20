var PhaseList = require('../').PhaseList;
var expect = require('chai').expect;

describe('PhaseList', function () {
  describe('phaseList.find(phaseName)', function() {
    it('should find a phase by phaseName', function () {
      var phaseList = new PhaseList();
      var phase = phaseList.add('test');
      expect(phase).to.eql(phaseList.find('test'));
    });
  });

  describe('phaseList.findOrAdd(phaseName)', function () {
    it('should always return a phase', function () {
      var phaseList = new PhaseList();
      var randomKey = Math.random().toString();
      var phase = phaseList.findOrAdd(randomKey);
      expect(phase.id).to.equal(randomKey);
    });
  });

  describe('phaseList.add(phaseName)', function () {

  });

  describe('phaseList.remove(phaseName)', function () {

  });

  describe('phaseList.launch(ctx, cb)', function () {

  });
});
