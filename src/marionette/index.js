import _ from 'lodash'
import Backbone from '../bb/index'

// Helpers
// -------

// Marionette.extend
// -----------------

// Borrow the Backbone `extend` method so we can use it as needed
const extend = Backbone.extend

// Marionette.isNodeAttached
// -------------------------

// Determine if `el` is a child of the document
const isNodeAttached = function (el) {
  return Backbone.$.contains(document.documentElement, el)
}

// Merge `keys` from `options` onto `this`
const mergeOptions = function (options, keys) {
  if (!options) {
    return
  }
  _.extend(this, _.pick(options, keys))
}

// Marionette.getOption
// --------------------

// Retrieve an object, function or other value from a target
// object or its `options`, with `options` taking precedence.
const getOption = function (target, optionName) {
  if (!target || !optionName) {
    return
  }
  if (target.options && (target.options[optionName] !== undefined)) {
    return target.options[optionName]
  } else {
    return target[optionName]
  }
}

// Proxy `Waiter.getOption`
const proxyGetOption = function (optionName) {
  return getOption(this, optionName)
}

// Similar to `_.result`, this is a simple helper
// If a function is provided we call it with context
// otherwise just return the value. If the value is
// undefined return a default value
const _getValue = function (value, context, params) {
  if (_.isFunction(value)) {
    value = params ? value.apply(context, params) : value.call(context)
  }
  return value
}

// Marionette.normalizeMethods
// ----------------------

// Pass in a mapping of events => functions or function names
// and return a mapping of events => functions
const normalizeMethods = function (hash) {
  return _.reduce(hash, function (normalizedHash, method, name) {
    if (!_.isFunction(method)) {
      method = this[method]
    }
    if (method) {
      normalizedHash[name] = method
    }
    return normalizedHash
  }, {}, this)
}

// utility method for parsing @ui. syntax strings
// into associated selector
const normalizeUIString = function (uiString, ui) {
  return uiString.replace(/@ui\.[a-zA-Z_$0-9]*/g, function (r) {
    return ui[r.slice(4)]
  })
}

// allows for the use of the @ui. syntax within
// a given key for triggers and events
// swaps the @ui with the associated selector.
// Returns a new, non-mutated, parsed events hash.
const normalizeUIKeys = function (hash, ui) {
  return _.reduce(hash, function (memo, val, key) {
    const normalizedKey = normalizeUIString(key, ui)
    memo[normalizedKey] = val
    return memo
  }, {})
}

// allows for the use of the @ui. syntax within
// a given value for regions
// swaps the @ui with the associated selector
const normalizeUIValues = function (hash, ui, properties) {
  _.each(hash, function (val, key) {
    if (_.isString(val)) {
      hash[key] = normalizeUIString(val, ui)
    } else if (_.isObject(val) && _.isArray(properties)) {
      _.extend(val, normalizeUIValues(_.pick(val, properties), ui))
            /* Value is an object, and we got an array of embedded property names to normalize. */
      _.each(properties, function (property) {
        const propertyVal = val[property]
        if (_.isString(propertyVal)) {
          val[property] = normalizeUIString(propertyVal, ui)
        }
      })
    }
  })
  return hash
}

export default {
  extend: extend,
  isNodeAttached: isNodeAttached,
  mergeOptions: mergeOptions,
  getOption: getOption,
  proxyGetOption: proxyGetOption,
  normalizeMethods: normalizeMethods,
  normalizeUIString: normalizeUIString,
  normalizeUIKeys: normalizeUIKeys,
  normalizeUIValues: normalizeUIValues,
  _getValue: _getValue
}
