import {expect} from 'chai'
import {View} from '../../../src/main'

describe('Waiter View', () => {
  it('should be able to extend', () => {
    var vw = View.extend({})

    expect(vw).to.be.an.object
  })
})
