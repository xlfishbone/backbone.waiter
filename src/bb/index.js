// Initial Setup
// -------------

import bbEvents from './events'
import bbExtend from './extend'
import bbView from './view'
import _ from 'lodash'
import bb$ from './bb$'

const BB = {
  Events: bbEvents,
  extend: bbExtend,
  View: bbView,
  $: bb$
}

// Allow the `Backbone` object to serve as a global event bus, for folks who
// want global "pubsub" in a convenient place.
_.extend(BB, bbEvents)

export default BB
