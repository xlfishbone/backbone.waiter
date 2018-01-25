(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('backbone'), require('underscore')) :
	typeof define === 'function' && define.amd ? define(['jquery', 'backbone', 'underscore'], factory) :
	(global.Backbone = global.Backbone || {}, global.Backbone.Waiter = factory(global.jQuery,global.Backbone,global._));
}(this, (function ($,Backbone,_) { 'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;
Backbone = Backbone && Backbone.hasOwnProperty('default') ? Backbone['default'] : Backbone;
_ = _ && _.hasOwnProperty('default') ? _['default'] : _;

var Waiter = {};

// Helpers
// -------

// Waiter.extend
// -----------------

// Borrow the Backbone `extend` method so we can use it as needed
Waiter.extend = Backbone.Model.extend;

// Waiter.isNodeAttached
// -------------------------

// Determine if `el` is a child of the document
Waiter.isNodeAttached = function (el) {
  return Backbone.$.contains(document.documentElement, el);
};

// Merge `keys` from `options` onto `this`
Waiter.mergeOptions = function (options, keys) {
  if (!options) {
    return;
  }
  _.extend(this, _.pick(options, keys));
};

// Waiter.getOption
// --------------------

// Retrieve an object, function or other value from a target
// object or its `options`, with `options` taking precedence.
Waiter.getOption = function (target, optionName) {
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
Waiter.proxyGetOption = function (optionName) {
  return Waiter.getOption(this, optionName);
};

// Similar to `_.result`, this is a simple helper
// If a function is provided we call it with context
// otherwise just return the value. If the value is
// undefined return a default value
Waiter._getValue = function (value, context, params) {
  if (_.isFunction(value)) {
    value = params ? value.apply(context, params) : value.call(context);
  }
  return value;
};

// Waiter.normalizeMethods
// ----------------------

// Pass in a mapping of events => functions or function names
// and return a mapping of events => functions
Waiter.normalizeMethods = function (hash) {
  return _.reduce(hash, function (normalizedHash, method, name) {
    if (!_.isFunction(method)) {
      method = this[method];
    }
    if (method) {
      normalizedHash[name] = method;
    }
    return normalizedHash;
  }, {}, this);
};

// utility method for parsing @ui. syntax strings
// into associated selector
Waiter.normalizeUIString = function (uiString, ui) {
  return uiString.replace(/@ui\.[a-zA-Z_$0-9]*/g, function (r) {
    return ui[r.slice(4)];
  });
};

// allows for the use of the @ui. syntax within
// a given key for triggers and events
// swaps the @ui with the associated selector.
// Returns a new, non-mutated, parsed events hash.
Waiter.normalizeUIKeys = function (hash, ui) {
  return _.reduce(hash, function (memo, val, key) {
    var normalizedKey = Waiter.normalizeUIString(key, ui);
    memo[normalizedKey] = val;
    return memo;
  }, {});
};

// allows for the use of the @ui. syntax within
// a given value for regions
// swaps the @ui with the associated selector
Waiter.normalizeUIValues = function (hash, ui, properties) {
  _.each(hash, function (val, key) {
    if (_.isString(val)) {
      hash[key] = Waiter.normalizeUIString(val, ui);
    } else if (_.isObject(val) && _.isArray(properties)) {
      _.extend(val, Waiter.normalizeUIValues(_.pick(val, properties), ui));
      /* Value is an object, and we got an array of embedded property names to normalize. */
      _.each(properties, function (property) {
        var propertyVal = val[property];
        if (_.isString(propertyVal)) {
          val[property] = Waiter.normalizeUIString(propertyVal, ui);
        }
      });
    }
  });
  return hash;
};

// Waiter.BaseView
//-------------------

var baseView = Backbone.View.extend({
  isDestroyed: false,

  constructor: function constructor(options) {
    this.render = _.bind(this.render, this);

    options = Waiter._getValue(options, this);

    // this exposes view options to the view initializer
    // this is a backfill since backbone removed the assignment
    // of this.options
    // at some point however this may be removed
    this.options = _.extend({}, _.result(this, "options"), options);

    Backbone.View.call(this, this.options);
  },


  // normalize the keys of passed hash with the views `ui` selectors.
  // `{"@ui.foo": "bar"}`
  normalizeUIKeys: function normalizeUIKeys(hash) {
    var uiBindings = _.result(this, "_uiBindings");
    return Waiter.normalizeUIKeys(hash, uiBindings || _.result(this, "ui"));
  },


  // normalize the values of passed hash with the views `ui` selectors.
  // `{foo: "@ui.bar"}`
  normalizeUIValues: function normalizeUIValues(hash, properties) {
    var ui = _.result(this, "ui");
    var uiBindings = _.result(this, "_uiBindings");
    return Waiter.normalizeUIValues(hash, uiBindings || ui, properties);
  },
  bindUIElements: function bindUIElements() {
    this._bindUIElements();
  },


  // This method binds the elements specified in the "ui" hash inside the view's code with
  // the associated jQuery selectors.
  _bindUIElements: function _bindUIElements() {
    if (!this.ui) {
      return;
    }

    // store the ui hash in _uiBindings so they can be reset later
    // and so re-rendering the view will be able to find the bindings
    if (!this._uiBindings) {
      this._uiBindings = this.ui;
    }

    // get the bindings result, as a function or otherwise
    var bindings = _.result(this, "_uiBindings");

    // empty the ui so we don't have anything to start with
    this.ui = {};

    // bind each of the selectors
    _.each(bindings, function (selector, key) {
      this.ui[key] = this.$(selector);
    }, this);
  },


  // This method unbinds the elements specified in the "ui" hash
  unbindUIElements: function unbindUIElements() {
    this._unbindUIElements();
  },
  _unbindUIElements: function _unbindUIElements() {
    if (!this.ui || !this._uiBindings) {
      return;
    }

    // delete all of the existing ui bindings
    _.each(this.ui, function ($el, name) {
      delete this.ui[name];
    }, this);

    // reset the ui element to the original bindings configuration
    this.ui = this._uiBindings;
    delete this._uiBindings;
  },


  // Overriding Backbone.View's delegateEvents to handle ui events
  delegateEvents: function delegateEvents(events) {
    this._delegateDOMEvents(events);

    return this;
  },


  // internal method to delegate DOM events and triggers
  _delegateDOMEvents: function _delegateDOMEvents(eventsArg) {
    var events = Waiter._getValue(eventsArg || this.events, this);

    // normalize ui keys
    events = this.normalizeUIKeys(events);
    if (_.isUndefined(eventsArg)) {
      this.events = events;
    }

    var combinedEvents = {};
    _.extend(combinedEvents, events);

    Backbone.View.prototype.delegateEvents.call(this, combinedEvents);
  },
  destroy: function destroy() {
    if (this.isDestroyed) {
      return this;
    }

    var args = _.toArray(arguments);
    this.isDestroyed = true;

    // unbind UI elements
    this.unbindUIElements();

    this.isRendered = false;

    // remove the view from the DOM
    this.remove();

    return this;
  },


  // overridable render after everything is ready.
  onRender: function onRender() {},
  render: function render() {
    this.isRendered = true;
    this.bindUIElements();
    this.onRender();

    return this;
  }
});

function autoLoader (View, props) {
  if (View) {
    var myView = new View(props);
    if ($(myView.el).length > 0) {
      // hook up ui and events
      myView.render();
    }
  }
}

var Waiter$2 = {};

Waiter$2.BaseView = baseView;
Waiter$2.AutoLoader = autoLoader;

return Waiter$2;

})));
//# sourceMappingURL=backbone.waiter.js.map
