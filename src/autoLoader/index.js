import $ from '../bb/bb$'

let viewList = []

function loadViewByEl () {
  viewList.forEach((View) => {
    const _myView = new View()

    if ($(_myView.el).length > 0) {
      _myView.render()
    }
  }, this)
}

export default {
  registerViews (views) {
    // hold our views
    viewList.push(...views)

    $(function () {
      loadViewByEl()
    })
  }
}
