var Phase = require('./phase');

module.exports = PhaseSet;

/**
 * A group of phases.
 *
 * ```js
 * var PhaseSet = require('loopback-phase').PhaseSet;
 * var set = new PhaseSet();
 * ```
 *
 * @class PhaseSet
 */

function PhaseSet() {
  this.phases = [];
}

/**
 * Add a `Phase` to the set.
 *
 * @param {Phase|String} phase The phase to be added.
 * @returns {Phase} The added phase.
 */

PhaseSet.prototype.add = function(phase) {
  if(typeof phase === 'string') {
    phase = new Phase(phase);
  }
  this.phases.push(phase);
  return phase;
}

/**
 * Add an array of phases to the set in the given order.
 *
 * @param {String[]} phaseOrder The phase order.
 */

PhaseSet.prototype.addInOrder = function(phaseOrder) {
  var cur, prev;
  var set = this;

  phaseOrder.forEach(function(phaseId) {
    prev = cur;
    cur = set.add(phaseId);
    if(prev) {
      prev.next = cur;
    }
  });
}

/**
 * Find a `Phase` from the set.
 *
 * @param {String} id The phase identifier
 * @returns {Phase} The `Phase` with the given `id`.
 */

PhaseSet.prototype.findById = function(id) {
  var phase;
  var i = 0;
  var phases = this.phases;
  var len = phases.length;
  for(; i < len; i++) {
    phase = phases[i];
    if(phase && phase.id === id) {
      return phase;
    }
  }
  return null;
}

/**
 * Find or add a `Phase` from/into the set.
 *
 * @param {String} id The phase identifier
 * @returns {Phase} The `Phase` with the given `id`.
 */

PhaseSet.prototype.findOrAdd = function(id) {
  var phase = this.findById(id);
  if(phase) return phase;
  return this.add(id);
}

/**
 * Get the set of phases as an array of `Phase` objects.
 *
 * @returns {Phase[]}
 */

PhaseSet.prototype.toArray = function() {
  return this.phases;
}
