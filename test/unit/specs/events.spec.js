import events from '../../../src/bb/events'
import {expect} from 'chai'
import _ from 'lodash'

describe('backbone events', () => {
  it('can on and trigger', () => {
    var obj = {counter: 0}
    _.extend(obj, events)
    obj.on('event', () => { obj.counter += 1 })
    obj.trigger('event')
    expect(obj.counter).to.equal(1, 'counter should be incremented')
    obj.trigger('event')
    obj.trigger('event')
    obj.trigger('event')
    obj.trigger('event')
    expect(obj.counter).to.equal(5, 'counter should be incremented')
  })

  it('can bind and trigger multiple events', () => {
    let obj = {counter: 0}
    _.extend(obj, events)

    obj.on('a b c', () => { obj.counter += 1 })

    obj.trigger('a')
    expect(obj.counter).to.equal(1)

    obj.trigger('a b')
    expect(obj.counter).to.equal(3)

    obj.trigger('c')
    expect(obj.counter).to.equal(4)

    obj.off('a c')
    obj.trigger('a b c')
    expect(obj.counter).to.equal(5)
  })

  it('can listen to other events', () => {
    let obj1 = {counter: 0}
    let obj2 = {}
    _.extend(obj1, events)
    _.extend(obj2, events)

    obj1.listenTo(obj2, 'add', () => { obj1.counter += 1 })
    obj2.trigger('add')
    expect(obj1.counter).to.be.equal(1)
  })
})
