import mnView from './marionette/baseview'
import events from './bb/events'
import _ from 'lodash'
import registerViews from './autoLoader'

var Waiter = {
  View: mnView,
  Events: events,
  createView: function (viewObj) {
    return mnView.extend(viewObj)
  },
  registerViews: registerViews
}

// add events to the global Waiter like BB does
_.extend(Waiter, events)

// export our main module using old module.export
// this removes the defualt junk
module.exports = Waiter

