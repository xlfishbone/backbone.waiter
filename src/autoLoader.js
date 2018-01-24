import $ from 'jquery'

export default function (View, props) {
    if (View) {
      var myView = new View(props)
      if ($(myView.el).length > 0) {
        // hook up ui and events
        myView.render()
      }
    }
  }