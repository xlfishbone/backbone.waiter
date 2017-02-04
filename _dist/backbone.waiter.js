(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("$"));
	else if(typeof define === 'function' && define.amd)
		define("backbone.waiter", ["$"], factory);
	else if(typeof exports === 'object')
		exports["backbone.waiter"] = factory(require("$"));
	else
		root["backbone.waiter"] = factory(root["$"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_66__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _baseview = __webpack_require__(1);

	var _baseview2 = _interopRequireDefault(_baseview);

	var _events = __webpack_require__(54);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  View: _baseview2.default,
	  Events: _events2.default
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isUndefined2 = __webpack_require__(2);

	var _isUndefined3 = _interopRequireDefault(_isUndefined2);

	var _each2 = __webpack_require__(3);

	var _each3 = _interopRequireDefault(_each2);

	var _result2 = __webpack_require__(4);

	var _result3 = _interopRequireDefault(_result2);

	var _extend2 = __webpack_require__(16);

	var _extend3 = _interopRequireDefault(_extend2);

	var _bind2 = __webpack_require__(32);

	var _bind3 = _interopRequireDefault(_bind2);

	var _view = __webpack_require__(40);

	var _view2 = _interopRequireDefault(_view);

	var _index = __webpack_require__(67);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _view2.default.extend({
	  isDestroyed: false,

	  constructor: function constructor(options) {
	    this.render = (0, _bind3.default)(this.render, this);

	    options = _index2.default._getValue(options, this);

	    this.options = (0, _extend3.default)({}, (0, _result3.default)(this, 'options'), options);

	    _view2.default.call(this, this.options);
	  },

	  normalizeUIKeys: function normalizeUIKeys(hash) {
	    var uiBindings = (0, _result3.default)(this, '_uiBindings');
	    return _index2.default.normalizeUIKeys(hash, uiBindings || (0, _result3.default)(this, 'ui'));
	  },

	  normalizeUIValues: function normalizeUIValues(hash, properties) {
	    var ui = (0, _result3.default)(this, 'ui');
	    var uiBindings = (0, _result3.default)(this, '_uiBindings');
	    return _index2.default.normalizeUIValues(hash, uiBindings || ui, properties);
	  },

	  bindUIElements: function bindUIElements() {
	    this._bindUIElements();
	  },

	  _bindUIElements: function _bindUIElements() {
	    if (!this.ui) {
	      return;
	    }

	    if (!this._uiBindings) {
	      this._uiBindings = this.ui;
	    }

	    var bindings = (0, _result3.default)(this, '_uiBindings');

	    this.ui = {};

	    (0, _each3.default)(bindings, function (selector, key) {
	      this.ui[key] = this.$(selector);
	    }, this);
	  },

	  unbindUIElements: function unbindUIElements() {
	    this._unbindUIElements();
	  },

	  _unbindUIElements: function _unbindUIElements() {
	    if (!this.ui || !this._uiBindings) {
	      return;
	    }

	    (0, _each3.default)(this.ui, function ($el, name) {
	      delete this.ui[name];
	    }, this);

	    this.ui = this._uiBindings;
	    delete this._uiBindings;
	  },

	  delegateEvents: function delegateEvents(events) {
	    this._delegateDOMEvents(events);

	    return this;
	  },

	  _delegateDOMEvents: function _delegateDOMEvents(eventsArg) {
	    var events = _index2.default._getValue(eventsArg || this.events, this);

	    events = this.normalizeUIKeys(events);
	    if ((0, _isUndefined3.default)(eventsArg)) {
	      this.events = events;
	    }

	    var combinedEvents = {};
	    (0, _extend3.default)(combinedEvents, events);

	    _view2.default.prototype.delegateEvents.call(this, combinedEvents);
	  },

	  destroy: function destroy() {
	    if (this.isDestroyed) {
	      return this;
	    }

	    this.isDestroyed = true;

	    this.unbindUIElements();

	    this.isRendered = false;

	    this.remove();

	    return this;
	  },

	  onRender: function onRender() {},

	  render: function render() {
	    this.isRendered = true;
	    this.bindUIElements();
	    this.onRender();

	    return this;
	  }

	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is `undefined`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	 * @example
	 *
	 * _.isUndefined(void 0);
	 * // => true
	 *
	 * _.isUndefined(null);
	 * // => false
	 */
	function isUndefined(value) {
	  return value === undefined;
	}

	module.exports = isUndefined;


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(5),
	    isFunction = __webpack_require__(12),
	    toKey = __webpack_require__(15);

	/**
	 * This method is like `_.get` except that if the resolved value is a
	 * function it's invoked with the `this` binding of its parent object and
	 * its result is returned.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to resolve.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
	 *
	 * _.result(object, 'a[0].b.c1');
	 * // => 3
	 *
	 * _.result(object, 'a[0].b.c2');
	 * // => 4
	 *
	 * _.result(object, 'a[0].b.c3', 'default');
	 * // => 'default'
	 *
	 * _.result(object, 'a[0].b.c3', _.constant('default'));
	 * // => 'default'
	 */
	function result(object, path, defaultValue) {
	  path = castPath(path, object);

	  var index = -1,
	      length = path.length;

	  // Ensure the loop is entered when path is empty.
	  if (!length) {
	    length = 1;
	    object = undefined;
	  }
	  while (++index < length) {
	    var value = object == null ? undefined : object[toKey(path[index])];
	    if (value === undefined) {
	      index = length;
	      value = defaultValue;
	    }
	    object = isFunction(value) ? value.call(object) : value;
	  }
	  return object;
	}

	module.exports = result;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(6),
	    isKey = __webpack_require__(7),
	    stringToPath = __webpack_require__(9),
	    toString = __webpack_require__(11);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value, object) {
	  if (isArray(value)) {
	    return value;
	  }
	  return isKey(value, object) ? [value] : stringToPath(toString(value));
	}

	module.exports = castPath;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(6),
	    isSymbol = __webpack_require__(8);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}

	module.exports = isKey;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var memoizeCapped = __webpack_require__(10);

	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function(string) {
	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	module.exports = stringToPath;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(13),
	    isObject = __webpack_require__(14);

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ },
/* 13 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17);


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(18),
	    createAssigner = __webpack_require__(24),
	    keysIn = __webpack_require__(31);

	/**
	 * This method is like `_.assign` except that it iterates over own and
	 * inherited source properties.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @alias extend
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assign
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * function Bar() {
	 *   this.c = 3;
	 * }
	 *
	 * Foo.prototype.b = 2;
	 * Bar.prototype.d = 4;
	 *
	 * _.assignIn({ 'a': 0 }, new Foo, new Bar);
	 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
	 */
	var assignIn = createAssigner(function(object, source) {
	  copyObject(source, keysIn(source), object);
	});

	module.exports = assignIn;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(19),
	    baseAssignValue = __webpack_require__(20);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	module.exports = copyObject;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(20),
	    eq = __webpack_require__(23);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignValue;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__(21);

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	module.exports = baseAssignValue;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(22);

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	module.exports = defineProperty;


/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(25),
	    isIterateeCall = __webpack_require__(30);

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(26),
	    overRest = __webpack_require__(27),
	    setToString = __webpack_require__(29);

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	module.exports = baseRest;


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(28);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = overRest;


/***/ },
/* 28 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 30 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 31 */
/***/ function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = nativeKeysIn;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(25),
	    createWrap = __webpack_require__(33),
	    getHolder = __webpack_require__(38),
	    replaceHolders = __webpack_require__(39);

	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG = 1,
	    WRAP_PARTIAL_FLAG = 32;

	/**
	 * Creates a function that invokes `func` with the `this` binding of `thisArg`
	 * and `partials` prepended to the arguments it receives.
	 *
	 * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
	 * may be used as a placeholder for partially applied arguments.
	 *
	 * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
	 * property of bound functions.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {...*} [partials] The arguments to be partially applied.
	 * @returns {Function} Returns the new bound function.
	 * @example
	 *
	 * function greet(greeting, punctuation) {
	 *   return greeting + ' ' + this.user + punctuation;
	 * }
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * var bound = _.bind(greet, object, 'hi');
	 * bound('!');
	 * // => 'hi fred!'
	 *
	 * // Bound with placeholders.
	 * var bound = _.bind(greet, object, _, '!');
	 * bound('hi');
	 * // => 'hi fred!'
	 */
	var bind = baseRest(function(func, thisArg, partials) {
	  var bitmask = WRAP_BIND_FLAG;
	  if (partials.length) {
	    var holders = replaceHolders(partials, getHolder(bind));
	    bitmask |= WRAP_PARTIAL_FLAG;
	  }
	  return createWrap(func, bitmask, thisArg, partials, holders);
	});

	// Assign default placeholders.
	bind.placeholder = {};

	module.exports = bind;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(28),
	    createCtor = __webpack_require__(34),
	    root = __webpack_require__(36);

	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG = 1;

	/**
	 * Creates a function that wraps `func` to invoke it with the `this` binding
	 * of `thisArg` and `partials` prepended to the arguments it receives.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} partials The arguments to prepend to those provided to
	 *  the new function.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createPartial(func, bitmask, thisArg, partials) {
	  var isBind = bitmask & WRAP_BIND_FLAG,
	      Ctor = createCtor(func);

	  function wrapper() {
	    var argsIndex = -1,
	        argsLength = arguments.length,
	        leftIndex = -1,
	        leftLength = partials.length,
	        args = Array(leftLength + argsLength),
	        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

	    while (++leftIndex < leftLength) {
	      args[leftIndex] = partials[leftIndex];
	    }
	    while (argsLength--) {
	      args[leftIndex++] = arguments[++argsIndex];
	    }
	    return apply(fn, isBind ? thisArg : this, args);
	  }
	  return wrapper;
	}

	module.exports = createPartial;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(35),
	    isObject = __webpack_require__(14);

	/**
	 * Creates a function that produces an instance of `Ctor` regardless of
	 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	 *
	 * @private
	 * @param {Function} Ctor The constructor to wrap.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCtor(Ctor) {
	  return function() {
	    // Use a `switch` statement to work with class constructors. See
	    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
	    // for more details.
	    var args = arguments;
	    switch (args.length) {
	      case 0: return new Ctor;
	      case 1: return new Ctor(args[0]);
	      case 2: return new Ctor(args[0], args[1]);
	      case 3: return new Ctor(args[0], args[1], args[2]);
	      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
	      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
	      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
	      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
	    }
	    var thisBinding = baseCreate(Ctor.prototype),
	        result = Ctor.apply(thisBinding, args);

	    // Mimic the constructor's `return` behavior.
	    // See https://es5.github.io/#x13.2.2 for more details.
	    return isObject(result) ? result : thisBinding;
	  };
	}

	module.exports = createCtor;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14);

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	module.exports = baseCreate;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(37);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 37 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 38 */
/***/ function(module, exports) {

	/**
	 * This method returns `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * _.times(2, _.noop);
	 * // => [undefined, undefined]
	 */
	function noop() {
	  // No operation performed.
	}

	module.exports = noop;


/***/ },
/* 39 */
/***/ function(module, exports) {

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	module.exports = stubArray;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _bind2 = __webpack_require__(32);

	var _bind3 = _interopRequireDefault(_bind2);

	var _isFunction2 = __webpack_require__(12);

	var _isFunction3 = _interopRequireDefault(_isFunction2);

	var _result2 = __webpack_require__(4);

	var _result3 = _interopRequireDefault(_result2);

	var _pick2 = __webpack_require__(41);

	var _pick3 = _interopRequireDefault(_pick2);

	var _extend2 = __webpack_require__(16);

	var _extend3 = _interopRequireDefault(_extend2);

	var _uniqueId2 = __webpack_require__(53);

	var _uniqueId3 = _interopRequireDefault(_uniqueId2);

	var _events = __webpack_require__(54);

	var _events2 = _interopRequireDefault(_events);

	var _extend4 = __webpack_require__(60);

	var _extend5 = _interopRequireDefault(_extend4);

	var _bb$ = __webpack_require__(65);

	var _bb$2 = _interopRequireDefault(_bb$);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var View = function View(options) {
	  this.cid = (0, _uniqueId3.default)('view');
	  (0, _extend3.default)(this, (0, _pick3.default)(options, viewOptions));
	  this._ensureElement();
	  this.initialize.apply(this, arguments);
	};

	var delegateEventSplitter = /^(\S+)\s*(.*)$/;

	var viewOptions = ['el', 'id', 'attributes', 'className', 'tagName', 'events'];

	(0, _extend3.default)(View.prototype, _events2.default, {
	  tagName: 'div',

	  $: function $(selector) {
	    return this.$el.find(selector);
	  },

	  initialize: function initialize() {},

	  render: function render() {
	    return this;
	  },

	  remove: function remove() {
	    this._removeElement();
	    this.stopListening();
	    return this;
	  },

	  _removeElement: function _removeElement() {
	    this.$el.remove();
	  },

	  setElement: function setElement(element) {
	    this.undelegateEvents();
	    this._setElement(element);
	    this.delegateEvents();
	    return this;
	  },

	  _setElement: function _setElement(el) {
	    this.$el = el instanceof _bb$2.default ? el : (0, _bb$2.default)(el);
	    this.el = this.$el[0];
	  },

	  delegateEvents: function delegateEvents(events) {
	    events || (events = (0, _result3.default)(this, 'events'));
	    if (!events) return this;
	    this.undelegateEvents();
	    for (var key in events) {
	      var method = events[key];
	      if (!(0, _isFunction3.default)(method)) method = this[method];
	      if (!method) continue;
	      var match = key.match(delegateEventSplitter);
	      this.delegate(match[1], match[2], (0, _bind3.default)(method, this));
	    }
	    return this;
	  },

	  delegate: function delegate(eventName, selector, listener) {
	    this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
	    return this;
	  },

	  undelegateEvents: function undelegateEvents() {
	    if (this.$el) this.$el.off('.delegateEvents' + this.cid);
	    return this;
	  },

	  undelegate: function undelegate(eventName, selector, listener) {
	    this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
	    return this;
	  },

	  _createElement: function _createElement(tagName) {
	    return document.createElement(tagName);
	  },

	  _ensureElement: function _ensureElement() {
	    if (!this.el) {
	      var attrs = (0, _extend3.default)({}, (0, _result3.default)(this, 'attributes'));
	      if (this.id) attrs.id = (0, _result3.default)(this, 'id');
	      if (this.className) attrs['class'] = (0, _result3.default)(this, 'className');
	      this.setElement(this._createElement((0, _result3.default)(this, 'tagName')));
	      this._setAttributes(attrs);
	    } else {
	      this.setElement((0, _result3.default)(this, 'el'));
	    }
	  },

	  _setAttributes: function _setAttributes(attributes) {
	    this.$el.attr(attributes);
	  },

	  extend: _extend5.default

	});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var basePick = __webpack_require__(42),
	    flatRest = __webpack_require__(52);

	/**
	 * Creates an object composed of the picked `object` properties.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [paths] The property paths to pick.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.pick(object, ['a', 'c']);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var pick = flatRest(function(object, paths) {
	  return object == null ? {} : basePick(object, paths);
	});

	module.exports = pick;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var basePickBy = __webpack_require__(43),
	    hasIn = __webpack_require__(47);

	/**
	 * The base implementation of `_.pick` without support for individual
	 * property identifiers.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} paths The property paths to pick.
	 * @returns {Object} Returns the new object.
	 */
	function basePick(object, paths) {
	  return basePickBy(object, paths, function(value, path) {
	    return hasIn(object, path);
	  });
	}

	module.exports = basePick;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(44),
	    baseSet = __webpack_require__(45),
	    castPath = __webpack_require__(5);

	/**
	 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} paths The property paths to pick.
	 * @param {Function} predicate The function invoked per property.
	 * @returns {Object} Returns the new object.
	 */
	function basePickBy(object, paths, predicate) {
	  var index = -1,
	      length = paths.length,
	      result = {};

	  while (++index < length) {
	    var path = paths[index],
	        value = baseGet(object, path);

	    if (predicate(value, path)) {
	      baseSet(result, castPath(path, object), value);
	    }
	  }
	  return result;
	}

	module.exports = basePickBy;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(5),
	    toKey = __webpack_require__(15);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = castPath(path, object);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(19),
	    castPath = __webpack_require__(5),
	    isIndex = __webpack_require__(46),
	    isObject = __webpack_require__(14),
	    toKey = __webpack_require__(15);

	/**
	 * The base implementation of `_.set`.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {Array|string} path The path of the property to set.
	 * @param {*} value The value to set.
	 * @param {Function} [customizer] The function to customize path creation.
	 * @returns {Object} Returns `object`.
	 */
	function baseSet(object, path, value, customizer) {
	  if (!isObject(object)) {
	    return object;
	  }
	  path = castPath(path, object);

	  var index = -1,
	      length = path.length,
	      lastIndex = length - 1,
	      nested = object;

	  while (nested != null && ++index < length) {
	    var key = toKey(path[index]),
	        newValue = value;

	    if (index != lastIndex) {
	      var objValue = nested[key];
	      newValue = customizer ? customizer(objValue, key, nested) : undefined;
	      if (newValue === undefined) {
	        newValue = isObject(objValue)
	          ? objValue
	          : (isIndex(path[index + 1]) ? [] : {});
	      }
	    }
	    assignValue(nested, key, newValue);
	    nested = nested[key];
	  }
	  return object;
	}

	module.exports = baseSet;


/***/ },
/* 46 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(48),
	    hasPath = __webpack_require__(49);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;


/***/ },
/* 48 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}

	module.exports = baseHasIn;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(5),
	    isArguments = __webpack_require__(50),
	    isArray = __webpack_require__(6),
	    isIndex = __webpack_require__(46),
	    isLength = __webpack_require__(51),
	    toKey = __webpack_require__(15);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = castPath(path, object);

	  var index = -1,
	      length = path.length,
	      result = false;

	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result || ++index != length) {
	    return result;
	  }
	  length = object == null ? 0 : object.length;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isArguments(object));
	}

	module.exports = hasPath;


/***/ },
/* 50 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 51 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 52 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(11);

	/** Used to generate unique IDs. */
	var idCounter = 0;

	/**
	 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {string} [prefix=''] The value to prefix the ID with.
	 * @returns {string} Returns the unique ID.
	 * @example
	 *
	 * _.uniqueId('contact_');
	 * // => 'contact_104'
	 *
	 * _.uniqueId();
	 * // => '105'
	 */
	function uniqueId(prefix) {
	  var id = ++idCounter;
	  return toString(prefix) + id;
	}

	module.exports = uniqueId;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _bind2 = __webpack_require__(32);

	var _bind3 = _interopRequireDefault(_bind2);

	var _uniqueId2 = __webpack_require__(53);

	var _uniqueId3 = _interopRequireDefault(_uniqueId2);

	var _once2 = __webpack_require__(55);

	var _once3 = _interopRequireDefault(_once2);

	var _keys2 = __webpack_require__(58);

	var _keys3 = _interopRequireDefault(_keys2);

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var eventSplitter = /\s+/;

	var eventsApi = function _eventsApi(iteratee, events, name, callback, opts) {
	  var i = 0;
	  var names = void 0;

	  if (name && (typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
	    if (callback !== undefined && 'context' in opts && opts.context === undefined) {
	      opts.context = callback;
	    }
	    for (names = (0, _keys3.default)(name); i < names.length; i++) {
	      events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
	    }
	  } else if (name && eventSplitter.test(name)) {
	    for (names = name.split(eventSplitter); i < names.length; i++) {
	      events = iteratee(events, names[i], callback, opts);
	    }
	  } else {
	    events = iteratee(events, name, callback, opts);
	  }
	  return events;
	};

	var internalOn = function internalOn(obj, name, callback, context, listening) {
	  obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
	    context: context,
	    ctx: obj,
	    listening: listening
	  });

	  if (listening) {
	    var listeners = obj._listeners || (obj._listeners = {});
	    listeners[listening.id] = listening;
	  }

	  return obj;
	};

	var onApi = function onApi(events, name, callback, options) {
	  if (callback) {
	    var handlers = events[name] || (events[name] = []);
	    var context = options.context;
	    var ctx = options.ctx;
	    var listening = options.listening;

	    if (listening) listening.count++;

	    handlers.push({
	      callback: callback,
	      context: context,
	      ctx: context || ctx,
	      listening: listening
	    });
	  }
	  return events;
	};

	var offApi = function offApi(events, name, callback, options) {
	  if (!events) return;

	  var i = 0;
	  var listening = void 0;
	  var context = options.context;
	  var listeners = options.listeners;

	  if (!name && !callback && !context) {
	    var ids = (0, _keys3.default)(listeners);
	    for (; i < ids.length; i++) {
	      listening = listeners[ids[i]];
	      delete listeners[listening.id];
	      delete listening.listeningTo[listening.objId];
	    }
	    return;
	  }

	  var names = name ? [name] : (0, _keys3.default)(events);
	  for (; i < names.length; i++) {
	    name = names[i];
	    var handlers = events[name];

	    if (!handlers) break;

	    var remaining = [];
	    for (var j = 0; j < handlers.length; j++) {
	      var handler = handlers[j];
	      if (callback && callback !== handler.callback && callback !== handler.callback._callback || context && context !== handler.context) {
	        remaining.push(handler);
	      } else {
	        listening = handler.listening;
	        if (listening && --listening.count === 0) {
	          delete listeners[listening.id];
	          delete listening.listeningTo[listening.objId];
	        }
	      }
	    }

	    if (remaining.length) {
	      events[name] = remaining;
	    } else {
	      delete events[name];
	    }
	  }
	  return events;
	};

	var onceMap = function onceMap(map, name, callback, offer) {
	  if (callback) {
	    (function () {
	      var once = map[name] = (0, _once3.default)(function () {
	        offer(name, once);
	        callback.apply(this, arguments);
	      });
	      once._callback = callback;
	    })();
	  }
	  return map;
	};

	var triggerApi = function triggerApi(objEvents, name, callback, args) {
	  if (objEvents) {
	    var events = objEvents[name];
	    var allEvents = objEvents.all;
	    if (events && allEvents) allEvents = allEvents.slice();
	    if (events) triggerEvents(events, args);
	    if (allEvents) triggerEvents(allEvents, [name].concat(args));
	  }
	  return objEvents;
	};

	var triggerEvents = function triggerEvents(events, args) {
	  var ev = void 0;
	  var i = -1;
	  var l = events.length;
	  var a1 = args[0];
	  var a2 = args[1];
	  var a3 = args[2];
	  switch (args.length) {
	    case 0:
	      while (++i < l) {
	        (ev = events[i]).callback.call(ev.ctx);
	      }return;
	    case 1:
	      while (++i < l) {
	        (ev = events[i]).callback.call(ev.ctx, a1);
	      }return;
	    case 2:
	      while (++i < l) {
	        (ev = events[i]).callback.call(ev.ctx, a1, a2);
	      }return;
	    case 3:
	      while (++i < l) {
	        (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
	      }return;
	    default:
	      while (++i < l) {
	        (ev = events[i]).callback.apply(ev.ctx, args);
	      }return;
	  }
	};

	exports.default = {

	  on: function on(name, callback, context) {

	    return internalOn(this, name, callback, context);
	  },

	  listenTo: function listenTo(obj, name, callback) {
	    if (!obj) return this;
	    var id = obj._listenId || (obj._listenId = (0, _uniqueId3.default)('l'));
	    var listeningTo = this._listeningTo || (this._listeningTo = {});
	    var listening = listeningTo[id];

	    if (!listening) {
	      var thisId = this._listenId || (this._listenId = (0, _uniqueId3.default)('l'));
	      listening = listeningTo[id] = {
	        obj: obj,
	        objId: id,
	        id: thisId,
	        listeningTo: listeningTo,
	        count: 0
	      };
	    }

	    internalOn(obj, name, callback, this, listening);
	    return this;
	  },

	  off: function off(name, callback, context) {
	    if (!this._events) return this;
	    this._events = eventsApi(offApi, this._events, name, callback, {
	      context: context,
	      listeners: this._listeners
	    });
	    return this;
	  },

	  stopListening: function stopListening(obj, name, callback) {
	    var listeningTo = this._listeningTo;
	    if (!listeningTo) return this;

	    var ids = obj ? [obj._listenId] : (0, _keys3.default)(listeningTo);

	    for (var i = 0; i < ids.length; i++) {
	      var listening = listeningTo[ids[i]];

	      if (!listening) break;

	      listening.obj.off(name, callback, this);
	    }

	    return this;
	  },

	  once: function once(name, callback, context) {
	    var events = eventsApi(onceMap, {}, name, callback, (0, _bind3.default)(this.off, this));
	    if (typeof name === 'string' && context == null) callback = void 0;
	    return this.on(events, callback, context);
	  },

	  listenToOnce: function listenToOnce(obj, name, callback) {
	    var events = eventsApi(onceMap, {}, name, callback, (0, _bind3.default)(this.stopListening, this, obj));
	    return this.listenTo(obj, events);
	  },

	  trigger: function trigger(name) {

	    if (!this._events) return this;

	    var length = Math.max(0, arguments.length - 1);
	    var args = Array(length);
	    for (var i = 0; i < length; i++) {
	      args[i] = arguments[i + 1];
	    }eventsApi(triggerApi, this._events, name, void 0, args);
	    return this;
	  },

	  bind: undefined.on,

	  unbind: undefined.off
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var before = __webpack_require__(56);

	/**
	 * Creates a function that is restricted to invoking `func` once. Repeat calls
	 * to the function return the value of the first invocation. The `func` is
	 * invoked with the `this` binding and arguments of the created function.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new restricted function.
	 * @example
	 *
	 * var initialize = _.once(createApplication);
	 * initialize();
	 * initialize();
	 * // => `createApplication` is invoked once
	 */
	function once(func) {
	  return before(2, func);
	}

	module.exports = once;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(57);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that invokes `func`, with the `this` binding and arguments
	 * of the created function, while it's called less than `n` times. Subsequent
	 * calls to the created function return the result of the last `func` invocation.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Function
	 * @param {number} n The number of calls at which `func` is no longer invoked.
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new restricted function.
	 * @example
	 *
	 * jQuery(element).on('click', _.before(5, addContactToList));
	 * // => Allows adding up to 4 contacts to the list.
	 */
	function before(n, func) {
	  var result;
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  n = toInteger(n);
	  return function() {
	    if (--n > 0) {
	      result = func.apply(this, arguments);
	    }
	    if (n <= 1) {
	      func = undefined;
	    }
	    return result;
	  };
	}

	module.exports = before;


/***/ },
/* 57 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(59);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 59 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _create2 = __webpack_require__(61);

	var _create3 = _interopRequireDefault(_create2);

	var _extend2 = __webpack_require__(16);

	var _extend3 = _interopRequireDefault(_extend2);

	var _has2 = __webpack_require__(63);

	var _has3 = _interopRequireDefault(_has2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var extend = function extend(protoProps, staticProps) {
	  var parent = this;
	  var child = void 0;

	  if (protoProps && (0, _has3.default)(protoProps, 'constructor')) {
	    child = protoProps.constructor;
	  } else {
	    child = function child() {
	      return parent.apply(this, arguments);
	    };
	  }

	  (0, _extend3.default)(child, parent, staticProps);

	  child.prototype = (0, _create3.default)(parent.prototype, protoProps);
	  child.prototype.constructor = child;

	  child.__super__ = parent.prototype;

	  return child;
	};

	exports.default = extend;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssign = __webpack_require__(62),
	    baseCreate = __webpack_require__(35);

	/**
	 * Creates an object that inherits from the `prototype` object. If a
	 * `properties` object is given, its own enumerable string keyed properties
	 * are assigned to the created object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Object
	 * @param {Object} prototype The object to inherit from.
	 * @param {Object} [properties] The properties to assign to the object.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * function Shape() {
	 *   this.x = 0;
	 *   this.y = 0;
	 * }
	 *
	 * function Circle() {
	 *   Shape.call(this);
	 * }
	 *
	 * Circle.prototype = _.create(Shape.prototype, {
	 *   'constructor': Circle
	 * });
	 *
	 * var circle = new Circle;
	 * circle instanceof Circle;
	 * // => true
	 *
	 * circle instanceof Shape;
	 * // => true
	 */
	function create(prototype, properties) {
	  var result = baseCreate(prototype);
	  return properties == null ? result : baseAssign(result, properties);
	}

	module.exports = create;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(18),
	    keys = __webpack_require__(58);

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}

	module.exports = baseAssign;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(64),
	    hasPath = __webpack_require__(49);

	/**
	 * Checks if `path` is a direct property of `object`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = { 'a': { 'b': 2 } };
	 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.has(object, 'a');
	 * // => true
	 *
	 * _.has(object, 'a.b');
	 * // => true
	 *
	 * _.has(object, ['a', 'b']);
	 * // => true
	 *
	 * _.has(other, 'a');
	 * // => false
	 */
	function has(object, path) {
	  return object != null && hasPath(object, path, baseHas);
	}

	module.exports = has;


/***/ },
/* 64 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  return object != null && hasOwnProperty.call(object, key);
	}

	module.exports = baseHas;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jquery = __webpack_require__(66);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _jquery2.default;

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_66__;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isArray2 = __webpack_require__(6);

	var _isArray3 = _interopRequireDefault(_isArray2);

	var _isObject2 = __webpack_require__(14);

	var _isObject3 = _interopRequireDefault(_isObject2);

	var _isString2 = __webpack_require__(68);

	var _isString3 = _interopRequireDefault(_isString2);

	var _each2 = __webpack_require__(3);

	var _each3 = _interopRequireDefault(_each2);

	var _reduce2 = __webpack_require__(70);

	var _reduce3 = _interopRequireDefault(_reduce2);

	var _isFunction2 = __webpack_require__(12);

	var _isFunction3 = _interopRequireDefault(_isFunction2);

	var _pick2 = __webpack_require__(41);

	var _pick3 = _interopRequireDefault(_pick2);

	var _extend2 = __webpack_require__(16);

	var _extend3 = _interopRequireDefault(_extend2);

	var _index = __webpack_require__(71);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var extend = _index2.default.extend;

	var isNodeAttached = function isNodeAttached(el) {
	  return _index2.default.$.contains(document.documentElement, el);
	};

	var mergeOptions = function mergeOptions(options, keys) {
	  if (!options) {
	    return;
	  }
	  (0, _extend3.default)(this, (0, _pick3.default)(options, keys));
	};

	var getOption = function getOption(target, optionName) {
	  if (!target || !optionName) {
	    return;
	  }
	  if (target.options && target.options[optionName] !== undefined) {
	    return target.options[optionName];
	  } else {
	    return target[optionName];
	  }
	};

	var proxyGetOption = function proxyGetOption(optionName) {
	  return getOption(this, optionName);
	};

	var _getValue = function _getValue(value, context, params) {
	  if ((0, _isFunction3.default)(value)) {
	    value = params ? value.apply(context, params) : value.call(context);
	  }
	  return value;
	};

	var normalizeMethods = function normalizeMethods(hash) {
	  return (0, _reduce3.default)(hash, function (normalizedHash, method, name) {
	    if (!(0, _isFunction3.default)(method)) {
	      method = this[method];
	    }
	    if (method) {
	      normalizedHash[name] = method;
	    }
	    return normalizedHash;
	  }, {}, this);
	};

	var normalizeUIString = function normalizeUIString(uiString, ui) {
	  return uiString.replace(/@ui\.[a-zA-Z_$0-9]*/g, function (r) {
	    return ui[r.slice(4)];
	  });
	};

	var normalizeUIKeys = function normalizeUIKeys(hash, ui) {
	  return (0, _reduce3.default)(hash, function (memo, val, key) {
	    var normalizedKey = normalizeUIString(key, ui);
	    memo[normalizedKey] = val;
	    return memo;
	  }, {});
	};

	var normalizeUIValues = function normalizeUIValues(hash, ui, properties) {
	  (0, _each3.default)(hash, function (val, key) {
	    if ((0, _isString3.default)(val)) {
	      hash[key] = normalizeUIString(val, ui);
	    } else if ((0, _isObject3.default)(val) && (0, _isArray3.default)(properties)) {
	      (0, _extend3.default)(val, normalizeUIValues((0, _pick3.default)(val, properties), ui));

	      (0, _each3.default)(properties, function (property) {
	        var propertyVal = val[property];
	        if ((0, _isString3.default)(propertyVal)) {
	          val[property] = normalizeUIString(propertyVal, ui);
	        }
	      });
	    }
	  });
	  return hash;
	};

	exports.default = {
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
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(13),
	    isArray = __webpack_require__(6),
	    isObjectLike = __webpack_require__(69);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 69 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 70 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	module.exports = arrayReduce;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extend2 = __webpack_require__(16);

	var _extend3 = _interopRequireDefault(_extend2);

	var _events = __webpack_require__(54);

	var _events2 = _interopRequireDefault(_events);

	var _extend4 = __webpack_require__(60);

	var _extend5 = _interopRequireDefault(_extend4);

	var _view = __webpack_require__(40);

	var _view2 = _interopRequireDefault(_view);

	var _bb$ = __webpack_require__(65);

	var _bb$2 = _interopRequireDefault(_bb$);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BB = {
	  Events: _events2.default,
	  extend: _extend5.default,
	  View: _view2.default,
	  $: _bb$2.default
	};

	(0, _extend3.default)(BB, _events2.default);

	exports.default = BB;

/***/ }
/******/ ])
});
;