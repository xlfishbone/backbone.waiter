var appView = (function() {
  'use strict';
  
  return Waiter.View.extend({
    el:'#app',
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
      alert('You clicked me');
    }
  });
})();
