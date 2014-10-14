var async = require('async');

module.exports = Phase;

/**
 * A slice of time in an application. Provides hooks to allow
 * functions to be executed before, during and after, the defined slice.
 *
 * ```js
 * var Phase = require('loopback-phase').Phase;
 * var myPhase = new Phase('my-phase');
 * ```
 *
 * @class Phase
 *
 * @prop {Phase} next The `Phase` to be executed after this `Phase`.
 * @prop {String} id The name or identifier of the `Phase`.
 *
 * @param {String} id The name or identifier of the `Phase`.
 */

function Phase(id) {
  this.id = id;
  this.next = null;
  this.handlers = [];
  this.beforeHandlers = [];
  this.afterHandlers = [];
}

/**
 * Register a phase handler. The handler will be executed
 * once the phase is launched. Handlers will be executed
 * in parralel and must callback once complete. If the
 * handler calls back with an error, the phase will immediately
 * hault execution and call the callback provided to
 * `phase.launch(callback)`.
 *
 * **Example**
 *
 * ```js
 * phase.register(function(next) {
 *   // specify an error if one occurred...
 *   var err = null;
 *   var ctx = this;
 *   console.log(ctx.message, 'world!'); // => hello world
 *   next(err);
 * });
 *
 * phase.launch({message: 'hello'}, function(err) {
 *   if(err) return console.error('phase has errored', err);
 *   console.log('phase has finished');
 * });
 * ```
 */

Phase.prototype.register = function(handler) {
  this.handlers.push(handler);
  return this;
}

/**
 * Register a phase handler to be executed before the phase begins.
 * See `register()` for an example.
 *
 * @param {Function} handler
 */

Phase.prototype.before = function(handler) {
  this.beforeHandlers.push(handler);
  return this;
}

/**
 * Register a phase handler to be executed after the phase completes.
 * See `register()` for an example.
 *
 * @param {Function} handler
 */

Phase.prototype.after = function(handler) {
  this.afterHandlers.push(handler);
  return this;
}


/**
 * Begin the execution of a phase and its handlers. Provide
 * a context object to be used as the scope for each handler
 * function.
 *
 * @param {Object} [context] The scope applied to each handler function.
 * @callback {Function} callback
 * @param {Error} err Any `Error` that occured during the execution of
 * the phase.
 */

Phase.prototype.launch = function(ctx, cb) {
  var nextPhase = this.next;
  if(typeof ctx === 'function') {
    cb = ctx;
    ctx = undefined;
  }

  var steps = [
    async.apply(async.parallel, bind(this.beforeHandlers, ctx)),
    async.apply(async.parallel, bind(this.handlers, ctx)),
    async.apply(async.parallel, bind(this.afterHandlers, ctx))
  ];

  if(nextPhase) {
    steps.push(nextPhase.launch.bind(nextPhase));
  }

  async.series(steps, cb);
}

function bind(handlers, ctx) {
  return handlers.map(function(handler) {
    return handler.bind(ctx);
  });
}

