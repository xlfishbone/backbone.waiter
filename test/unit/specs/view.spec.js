import {expect} from 'chai'
import {View} from '../../../src/main'

describe('Waiter View', () => {
  it('should be able to extend', () => {
    const Vw = View.extend({
      ui: {
        test: 'test'
      }
    })
    const actual = new Vw()

    expect(Vw).to.be.an.object
    expect(actual.ui['test']).to.be.equal('test')
  })
})
