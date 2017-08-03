(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("_"), require("$"));
	else if(typeof define === 'function' && define.amd)
		define("Waiter", ["_", "$"], factory);
	else if(typeof exports === 'object')
		exports["Waiter"] = factory(require("_"), require("$"));
	else
		root["Waiter"] = factory(root["_"], root["$"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventSplitter = /\s+/;

var eventsApi = function _eventsApi(iteratee, events, name, callback, opts) {
  var i = 0;
  var names = void 0;

  if (name && (typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
    if (callback !== undefined && 'context' in opts && opts.context === undefined) {
      opts.context = callback;
    }
    for (names = _lodash2.default.keys(name); i < names.length; i++) {
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
    var ids = _lodash2.default.keys(listeners);
    for (; i < ids.length; i++) {
      listening = listeners[ids[i]];
      delete listeners[listening.id];
      delete listening.listeningTo[listening.objId];
    }
    return;
  }

  var names = name ? [name] : _lodash2.default.keys(events);
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
    var once = map[name] = _lodash2.default.once(function () {
      offer(name, once);
      callback.apply(this, arguments);
    });
    once._callback = callback;
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
    var id = obj._listenId || (obj._listenId = _lodash2.default.uniqueId('l'));
    var listeningTo = this._listeningTo || (this._listeningTo = {});
    var listening = listeningTo[id];

    if (!listening) {
      var thisId = this._listenId || (this._listenId = _lodash2.default.uniqueId('l'));
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

    var ids = obj ? [obj._listenId] : _lodash2.default.keys(listeningTo);

    for (var i = 0; i < ids.length; i++) {
      var listening = listeningTo[ids[i]];

      if (!listening) break;

      listening.obj.off(name, callback, this);
    }

    return this;
  },

  once: function once(name, callback, context) {
    var events = eventsApi(onceMap, {}, name, callback, _lodash2.default.bind(this.off, this));
    if (typeof name === 'string' && context == null) callback = void 0;
    return this.on(events, callback, context);
  },

  listenToOnce: function listenToOnce(obj, name, callback) {
    var events = eventsApi(onceMap, {}, name, callback, _lodash2.default.bind(this.stopListening, this, obj));
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
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = __webpack_require__(8);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _jquery2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = __webpack_require__(1);

var _events2 = _interopRequireDefault(_events);

var _extend = __webpack_require__(4);

var _extend2 = _interopRequireDefault(_extend);

var _view = __webpack_require__(7);

var _view2 = _interopRequireDefault(_view);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _bb$ = __webpack_require__(2);

var _bb$2 = _interopRequireDefault(_bb$);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BB = {
  Events: _events2.default,
  extend: _extend2.default,
  View: _view2.default,
  $: _bb$2.default
};

_lodash2.default.extend(BB, _events2.default);

exports.default = BB;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (protoProps, staticProps) {
  var parent = this;
  var child = void 0;

  if (protoProps && _lodash2.default.has(protoProps, 'constructor')) {
    child = protoProps.constructor;
  } else {
    child = function child() {
      return parent.apply(this, arguments);
    };
  }

  _lodash2.default.extend(child, parent, staticProps);

  child.prototype = _lodash2.default.create(parent.prototype, protoProps);
  child.prototype.constructor = child;

  child.__super__ = parent.prototype;

  return child;
};

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _baseview = __webpack_require__(6);

var _baseview2 = _interopRequireDefault(_baseview);

var _events = __webpack_require__(1);

var _events2 = _interopRequireDefault(_events);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _autoLoader = __webpack_require__(10);

var _autoLoader2 = _interopRequireDefault(_autoLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Waiter = {
  View: _baseview2.default,
  Events: _events2.default,
  createView: function createView(viewObj) {
    return _baseview2.default.extend(viewObj);
  },
  registerViews: _autoLoader2.default
};

_lodash2.default.extend(Waiter, _events2.default);

module.exports = Waiter;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(3);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(9);

var _index4 = _interopRequireDefault(_index3);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mnView = _index2.default.View.extend({
  isDestroyed: false,

  constructor: function constructor(options) {
    this.render = _lodash2.default.bind(this.render, this);

    options = _index4.default._getValue(options, this);

    this.options = _lodash2.default.extend({}, _lodash2.default.result(this, 'options'), options);

    _index2.default.View.call(this, this.options);
  },

  normalizeUIKeys: function normalizeUIKeys(hash) {
    var uiBindings = _lodash2.default.result(this, '_uiBindings');
    return _index4.default.normalizeUIKeys(hash, uiBindings || _lodash2.default.result(this, 'ui'));
  },

  normalizeUIValues: function normalizeUIValues(hash, properties) {
    var ui = _lodash2.default.result(this, 'ui');
    var uiBindings = _lodash2.default.result(this, '_uiBindings');
    return _index4.default.normalizeUIValues(hash, uiBindings || ui, properties);
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

    var bindings = _lodash2.default.result(this, '_uiBindings');

    this.ui = {};

    var self = this;
    _lodash2.default.each(bindings, function (selector, key) {
      self.ui[key] = self.$(selector);
    });
  },

  unbindUIElements: function unbindUIElements() {
    this._unbindUIElements();
  },

  _unbindUIElements: function _unbindUIElements() {
    if (!this.ui || !this._uiBindings) {
      return;
    }

    var self = this;
    _lodash2.default.each(this.ui, function ($el, name) {
      delete self.ui[name];
    });

    this.ui = this._uiBindings;
    delete this._uiBindings;
  },

  delegateEvents: function delegateEvents(events) {
    this._delegateDOMEvents(events);

    return this;
  },

  _delegateDOMEvents: function _delegateDOMEvents(eventsArg) {
    var events = _index4.default._getValue(eventsArg || this.events, this);

    events = this.normalizeUIKeys(events);
    if (_lodash2.default.isUndefined(eventsArg)) {
      this.events = events;
    }

    var combinedEvents = {};
    _lodash2.default.extend(combinedEvents, events);

    _index2.default.View.prototype.delegateEvents.call(this, combinedEvents);
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

exports.default = mnView;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _events = __webpack_require__(1);

var _events2 = _interopRequireDefault(_events);

var _extend = __webpack_require__(4);

var _extend2 = _interopRequireDefault(_extend);

var _bb$ = __webpack_require__(2);

var _bb$2 = _interopRequireDefault(_bb$);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var View = function View(options) {
  this.cid = _lodash2.default.uniqueId('view');
  _lodash2.default.extend(this, _lodash2.default.pick(options, viewOptions));
  this._ensureElement();
  this.initialize.apply(this, arguments);
};

var delegateEventSplitter = /^(\S+)\s*(.*)$/;

var viewOptions = ['el', 'id', 'attributes', 'className', 'tagName', 'events'];

_lodash2.default.extend(View.prototype, _events2.default, {
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
    events || (events = _lodash2.default.result(this, 'events'));
    if (!events) return this;
    this.undelegateEvents();
    for (var key in events) {
      var method = events[key];
      if (!_lodash2.default.isFunction(method)) method = this[method];
      if (!method) continue;
      var match = key.match(delegateEventSplitter);
      this.delegate(match[1], match[2], _lodash2.default.bind(method, this));
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
      var attrs = _lodash2.default.extend({}, _lodash2.default.result(this, 'attributes'));
      if (this.id) attrs.id = _lodash2.default.result(this, 'id');
      if (this.className) attrs['class'] = _lodash2.default.result(this, 'className');
      this.setElement(this._createElement(_lodash2.default.result(this, 'tagName')));
      this._setAttributes(attrs);
    } else {
      this.setElement(_lodash2.default.result(this, 'el'));
    }
  },

  _setAttributes: function _setAttributes(attributes) {
    this.$el.attr(attributes);
  }
});

View.extend = _extend2.default;

exports.default = View;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _index = __webpack_require__(3);

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
  _lodash2.default.extend(this, _lodash2.default.pick(options, keys));
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
  if (_lodash2.default.isFunction(value)) {
    value = params ? value.apply(context, params) : value.call(context);
  }
  return value;
};

var normalizeMethods = function normalizeMethods(hash) {
  var self = this;
  return _lodash2.default.reduce(hash, function (normalizedHash, method, name) {
    if (!_lodash2.default.isFunction(method)) {
      method = self[method];
    }
    if (method) {
      normalizedHash[name] = method;
    }
    return normalizedHash;
  }, {});
};

var normalizeUIString = function normalizeUIString(uiString, ui) {
  return uiString.replace(/@ui\.[a-zA-Z_$0-9]*/g, function (r) {
    return ui[r.slice(4)];
  });
};

var normalizeUIKeys = function normalizeUIKeys(hash, ui) {
  return _lodash2.default.reduce(hash, function (memo, val, key) {
    var normalizedKey = normalizeUIString(key, ui);
    memo[normalizedKey] = val;
    return memo;
  }, {});
};

var normalizeUIValues = function normalizeUIValues(hash, ui, properties) {
  _lodash2.default.each(hash, function (val, key) {
    if (_lodash2.default.isString(val)) {
      hash[key] = normalizeUIString(val, ui);
    } else if (_lodash2.default.isObject(val) && _lodash2.default.isArray(properties)) {
      _lodash2.default.extend(val, normalizeUIValues(_lodash2.default.pick(val, properties), ui));

      _lodash2.default.each(properties, function (property) {
        var propertyVal = val[property];
        if (_lodash2.default.isString(propertyVal)) {
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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bb$ = __webpack_require__(2);

var _bb$2 = _interopRequireDefault(_bb$);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var viewList = [];

function loadViewByEl() {
  viewList.forEach(function (View) {
    var _myView = new View();

    if ((0, _bb$2.default)(_myView.el).length > 0) {
      _myView.render();
    }
  }, this);
}

exports.default = {
  registerViews: function registerViews(views) {
    viewList.push.apply(viewList, _toConsumableArray(views));

    (0, _bb$2.default)(function () {
      loadViewByEl();
    });
  }
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=backbone.waiter.js.map