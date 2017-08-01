import $ from '../bb/bb$'

let viewList = []

function loadViewByEl () {
  viewList.forEach((View) => {
    const el = View.el

    if ($(el).length > 0) {
      // el found in dom
      // initialize the view
      const _myView = new View()

      // hook up ui and events
      _myView.render()
    }
  }, this)
}

export default {
  registerViews (views) {
    // hold our views

    viewList.push(...views)

    document.addEventListener('DOMContentLoaded', (event) => {
      loadViewByEl()
    })

    $(function () {
      loadViewByEl()
    })
  }
}
