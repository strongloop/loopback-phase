var Phase = require('./phase');

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
  this.root = null;
}

/**
 * Get the first `Phase` in the list.
 *
 * @returns {Phase} The first phase.
 */

PhaseList.prototype.first = function() {
  return this.root;
}

/**
 * Get the last `Phase` in the list.
 *
 * @returns {Phase} The last phase.
 */

PhaseList.prototype.last = function() {
  var cur = this.root;
  while(cur.next) {
    cur = cur.next;
  }
  return cur;
}

/**
 * Add one or more phases to the list.
 *
 * @param {Phase|String|String[]} phase The phase (or phases) to be added.
 * @returns {Phase|Phase[]} The added phase or phases.
 */

PhaseList.prototype.add = function(phase) {
  var list = this;
  var last = this.last();

  if(Array.isArray(phase)) {
    return phase.map(list.add.bind(list));
  }

  if(typeof phase === 'string') {
    phase = new Phase(phase);
  }

  phase.next = null;
  phase.prev = last;
  
  if(this.root === null) {
    this.root = phase;
  }
  return phase;
}

/**
 * Remove a `Phase` from the list.
 *
 * @param {Phase|String} phase The phase to be removed.
 * @returns {Phase} The removed phase.
 */

PhaseList.prototype.remove = function(phase) {
  if(typeof phase === 'string') {
    phase = this.find(phase);
  }
  var next = phase.next;
  var prev = phase.prev;

  if(prev) {
    prev.next = next;
  }

  phase.next = null;
  phase.prev = null;

  if(phase === this.root) {
    delete this.root;
  }

  return phase;
}

/**
 * Find a `Phase` from the list.
 *
 * @param {String} id The phase identifier
 * @returns {Phase} The `Phase` with the given `id`.
 */

PhaseList.prototype.find = function(id) {
  var phase;
  var phases = this.phases;
  var cur = this.root;
  while(cur) {
    if(cur.id === id) return cur;
    cur = cur.next;
  }
  return null;
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
  var arr = [this.root];
  var cur = this.root;

  while(cur.next) {
    arr.push(cur);
    cur = cur.next;
  }

  arr.push(cur);

  return arr;
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

PhaseList.prototype.launch = function(ctx, cb) {
  var phase = this.root;

  if(phase) {
    phase.launch.apply(phase, arguments);
  } else {
    process.nextTick(cb);
  }
}
