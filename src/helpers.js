import $ from "jquery";
import Backbone from "backbone";
import _ from "underscore";

let Waiter = {};

// Helpers
// -------

// Waiter.extend
// -----------------

// Borrow the Backbone `extend` method so we can use it as needed
Waiter.extend = Backbone.Model.extend;

// Waiter.isNodeAttached
// -------------------------

// Determine if `el` is a child of the document
Waiter.isNodeAttached = el => Backbone.$.contains(document.documentElement, el);

// Merge `keys` from `options` onto `this`
Waiter.mergeOptions = function(options, keys) {
  if (!options) {
    return;
  }
  _.extend(this, _.pick(options, keys));
};

// Waiter.getOption
// --------------------

// Retrieve an object, function or other value from a target
// object or its `options`, with `options` taking precedence.
Waiter.getOption = (target, optionName) => {
  if (!target || !optionName) {
    return;
  }
  if (target.options && target.options[optionName] !== undefined) {
    return target.options[optionName];
  } else {
    return target[optionName];
  }
};

// Proxy `Waiter.getOption`
Waiter.proxyGetOption = function(optionName) {
  return Waiter.getOption(this, optionName);
};

// Similar to `_.result`, this is a simple helper
// If a function is provided we call it with context
// otherwise just return the value. If the value is
// undefined return a default value
Waiter._getValue = (value, context, params) => {
  if (_.isFunction(value)) {
    value = params ? value.apply(context, params) : value.call(context);
  }
  return value;
};

// Waiter.normalizeMethods
// ----------------------

// Pass in a mapping of events => functions or function names
// and return a mapping of events => functions
Waiter.normalizeMethods = function(hash) {
  return _.reduce(
    hash,
    function(normalizedHash, method, name) {
      if (!_.isFunction(method)) {
        method = this[method];
      }
      if (method) {
        normalizedHash[name] = method;
      }
      return normalizedHash;
    },
    {},
    this
  );
};

// utility method for parsing @ui. syntax strings
// into associated selector
Waiter.normalizeUIString = (uiString, ui) =>
  uiString.replace(/@ui\.[a-zA-Z_$0-9]*/g, r => ui[r.slice(4)]);

// allows for the use of the @ui. syntax within
// a given key for triggers and events
// swaps the @ui with the associated selector.
// Returns a new, non-mutated, parsed events hash.
Waiter.normalizeUIKeys = (hash, ui) =>
  _.reduce(
    hash,
    (memo, val, key) => {
      var normalizedKey = Waiter.normalizeUIString(key, ui);
      memo[normalizedKey] = val;
      return memo;
    },
    {}
  );

// allows for the use of the @ui. syntax within
// a given value for regions
// swaps the @ui with the associated selector
Waiter.normalizeUIValues = (hash, ui, properties) => {
  _.each(hash, (val, key) => {
    if (_.isString(val)) {
      hash[key] = Waiter.normalizeUIString(val, ui);
    } else if (_.isObject(val) && _.isArray(properties)) {
      _.extend(val, Waiter.normalizeUIValues(_.pick(val, properties), ui));
      /* Value is an object, and we got an array of embedded property names to normalize. */
      _.each(properties, property => {
        var propertyVal = val[property];
        if (_.isString(propertyVal)) {
          val[property] = Waiter.normalizeUIString(propertyVal, ui);
        }
      });
    }
  });
  return hash;
};

export default Waiter;
