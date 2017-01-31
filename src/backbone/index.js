// Initial Setup
// -------------

// Save the previous value of the `Backbone` variable, so that it can be
// restored later on, if `noConflict` is used.
var previousBackbone = root.Backbone;

// Create a local reference to a common array method we'll want to use later.
var slice = Array.prototype.slice;

// Current version of the library. Keep in sync with `package.json`.
Backbone.VERSION = '1.3.3';

// For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
// the `$` variable.
Backbone.$ = $;

// Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
// to its previous owner. Returns a reference to this Backbone object.
Backbone.noConflict = function() {
  root.Backbone = previousBackbone;
  return this;
};
