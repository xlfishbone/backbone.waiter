import mnView from './marionette/baseview'
import events from './bb/events'
import _ from 'lodash'

var Waiter = {
  View: mnView,
  Events: events
}

// add events to the global Waiter like BB does
_.extend(Waiter.prototype, events)

// export our main module using old module.export
// this removes the defualt junk
module.exports = Waiter

