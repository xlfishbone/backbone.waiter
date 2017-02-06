import baseView from './marionette/baseview'
import events from './bb/events'
import _ from 'lodash'

var Waiter = {
  View: baseView,
  Events: events
}

// add events to the global Waiter like BB does
_.extend(Waiter.prototype, events)

export default Waiter

