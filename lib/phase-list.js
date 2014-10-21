var Phase = require('./phase');
var async = require('async');

module.exports = PhaseList;

/**
 * An ordered list of phases.
 *
 * ```js
 * var PhaseList = require('loopback-phase').PhaseList;
 * var phases = new PhaseList();
 * phases.add('my-phase');
 * ```
 *
 * @class PhaseList
 */

function PhaseList() {
  this._phases = [];
  this._phaseMap = {};
}

/**
 * Get the first `Phase` in the list.
 *
 * @returns {Phase} The first phase.
 */

PhaseList.prototype.first = function() {
  return this._phases[0];
}

/**
 * Get the last `Phase` in the list.
 *
 * @returns {Phase} The last phase.
 */

PhaseList.prototype.last = function() {
  this._phases[this._phases.length - 1];
}

/**
 * Add one or more phases to the list.
 *
 * @param {Phase|String|String[]} phase The phase (or phases) to be added.
 * @returns {Phase|Phase[]} The added phase or phases.
 */

PhaseList.prototype.add = function(phase) {
  var list = this;

  if(Array.isArray(phase)) {
    return phase.map(list.add.bind(list));
  }

  if(typeof phase === 'string') {
    phase = new Phase(phase);
  }

  this._phases.push(phase);
  this._phaseMap[phase.id] = phase;

  return phase;
}

/**
 * Remove a `Phase` from the list.
 *
 * @param {Phase|String} phase The phase to be removed.
 * @returns {Phase} The removed phase.
 */

PhaseList.prototype.remove = function(phase) {
  var phases = this._phases;
  var phaseMap = this._phaseMap;
  var phaseId;

  if(!phase) return null;

  if(typeof phase === 'object') {
    phaseId = phase.id;
  } else {
    phaseId = phase;
    phase = phaseMap[phaseId];
  }
  
  phases.splice(phases.indexOf(phase), 1);
  delete this._phaseMap[phaseId];

  return phase;
}

/**
 * Find a `Phase` from the list.
 *
 * @param {String} id The phase identifier
 * @returns {Phase} The `Phase` with the given `id`.
 */

PhaseList.prototype.find = function(id) {
  return this._phaseMap[id] || null;
}

/**
 * Find or add a `Phase` from/into the list.
 *
 * @param {String} id The phase identifier
 * @returns {Phase} The `Phase` with the given `id`.
 */

PhaseList.prototype.findOrAdd = function(id) {
  var phase = this.find(id);
  if(phase) return phase;
  return this.add(id);
}

/**
 * Get the list of phases as an array of `Phase` objects.
 *
 * @returns {Phase[]} An array of phases.
 */

PhaseList.prototype.toArray = function() {
  return this._phases.slice(0);
}

/**
 * Launch the phases contained in the list. If there are no phases
 * in the list `process.nextTick` is called with the provided callback.
 *
 * @param {Object} [context] The context of each `Phase` handler.
 * @callback {Function} cb
 * @param {Error} err Any error that occured during a phase contained
 * in the list.
 */

PhaseList.prototype.run = function(ctx, cb) {
  if(typeof ctx === 'function') {
    cb = ctx;
    ctx = undefined;
  }

  var phases = this._phases.map(function(phase) {
    return function(cb) {
      console.log('....?');
      phase.run(ctx, cb);
    }
  });

  if(phases.length) {
    async.series(phases, cb);
  } else {
    process.nextTick(cb);
  }
}
