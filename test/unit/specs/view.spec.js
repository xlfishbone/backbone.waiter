import { expect } from 'chai'
import { View } from '../../../src/main'
import $ from 'jquery'
import _ from 'lodash'

describe('Waiter View', () => {
  beforeEach(function () {
    this.Vw = View.extend({
      el: 'body',
      ui: {
        test: 'test'
      },
      initialize: function () {
        this.test()
      },
      test: function () {
        console.log('woot')
      }
    })
  })
  it('should be able to extend', function () {
    expect(this.Vw).to.be.an.object
  })

  it('should call init when instantiated', function () {
    const spy = sinon.spy(this.Vw, 'test')
    // const v = new this.Vw()

    expect(spy).to.have.been.called
  })

  it('should call render when rendered', () => {

  })
})

