
// http://youmightnotneedjquery.com/
// https://github.com/angular/angular.js/blob/master/src/jqLite.js#L24

const jqLite = function (selector) {
  const queryResults = _query(selector)
  const _context = _query('html')
  const _prevObject = {}

  const _$ = {
    selector: selector,
    context: _context,
    length: queryResults.length,
    prevObject: _prevObject,
    on: function (eventString, callback) {
      for (let i = 0; i < this.length; i++) {
        this[i].events = this[i].events || {}
        this[i].addEventListener(eventString, callback)
        this[i].events[eventString + ' ' + selector] = callback
      }
      return this
    },
    off: function (eventString) {
      for (let i = 0; i < this.length; i++) {
        this[i].removeEventListener(eventString, this[i].events[eventString + ' ' + selector])
      }
      return this
    },
    find: function (selector) {
      // const res = []
      // return el.querySelectorAll(selector)
    }

  }

  for (let i = 0, len = queryResults.length; i < len; i++) {
    _$[i] = queryResults[i]
  }

  return _$
}

function _query (qs) {
  return document.querySelectorAll(qs)
}

// $.contains(el, child)
// function contains (el, child) {
//   return el !== child && el.contains(child)
// }

// $().find
// $().remove
// $().on
// $().off
// $().attr
// $().contains

export default jqLite
