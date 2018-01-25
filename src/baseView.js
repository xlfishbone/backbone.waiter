import $ from "jquery";
import Backbone from "backbone";
import _ from "underscore";
import Waiter from "./helpers";

// Waiter.BaseView
//-------------------

export default Backbone.View.extend({
  isDestroyed: false,

  constructor(options) {
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
  normalizeUIKeys(hash) {
    var uiBindings = _.result(this, "_uiBindings");
    return Waiter.normalizeUIKeys(hash, uiBindings || _.result(this, "ui"));
  },

  // normalize the values of passed hash with the views `ui` selectors.
  // `{foo: "@ui.bar"}`
  normalizeUIValues(hash, properties) {
    var ui = _.result(this, "ui");
    var uiBindings = _.result(this, "_uiBindings");
    return Waiter.normalizeUIValues(hash, uiBindings || ui, properties);
  },

  bindUIElements() {
    this._bindUIElements();
  },

  // This method binds the elements specified in the "ui" hash inside the view's code with
  // the associated jQuery selectors.
  _bindUIElements() {
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
    _.each(
      bindings,
      function(selector, key) {
        this.ui[key] = this.$(selector);
      },
      this
    );
  },

  // This method unbinds the elements specified in the "ui" hash
  unbindUIElements() {
    this._unbindUIElements();
  },

  _unbindUIElements() {
    if (!this.ui || !this._uiBindings) {
      return;
    }

    // delete all of the existing ui bindings
    _.each(
      this.ui,
      function($el, name) {
        delete this.ui[name];
      },
      this
    );

    // reset the ui element to the original bindings configuration
    this.ui = this._uiBindings;
    delete this._uiBindings;
  },

  // Overriding Backbone.View's delegateEvents to handle ui events
  delegateEvents(events) {
    this._delegateDOMEvents(events);

    return this;
  },

  // internal method to delegate DOM events and triggers
  _delegateDOMEvents(eventsArg) {
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

  destroy() {
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
  onRender() {},

  render() {
    this.isRendered = true;
    this.bindUIElements();
    this.onRender();

    return this;
  }
});
