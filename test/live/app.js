/* es-lint-ignore-all */
var app = (function () {
  'use strict';

  var _appView = Waiter.View.extend({
    el: '#app',
    ui: {
      txtInput: '#txtInput',
      btnSave: '#btnSave'
    },
    events: {
      'click @ui.btnSave': 'onSaveClick'
    },
    onRender: function () {
      this.ui.txtInput.val('this got dynamically put here');
    },
    onSaveClick: function (evt) {
      evt.preventDefault();
      this.trigger('txtChange', this.ui.txtInput.val());
    }
  });

  var _appView2 = Waiter.View.extend({
    el: '#app2',
    initialize: function (props) {
      this.listenTo(props.view1, 'txtChange', this.onTxtChange);
    },
    ui: {
      txt2: '#txt2'
    },
    onTxtChange: function (txt) {
      this.ui.txt2.val(txt);
    }
  });

  return {
    appView: _appView,
    appView2: _appView2
  }
})();
