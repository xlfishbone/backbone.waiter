import Waiter from "../dist/backbone.waiter";
import $ from "jquery";

const testView = Waiter.BaseView.extend({
  el: ".testView", // where the view starts

  initialize: function() {
    // called when view is instantiated
    // the ui hash and events are not ready yet
    this.onInitLocal();
  },

  // jQuery selectors stored in a hash
  ui: {
    // prop: selector
    btnSubmit: "#btnSubmit"
  },

  events: {
    // event selector/@ui.prop: function
    "click @ui.btnSubmit": "onbtnSubmit"
  },

  onbtnSubmit: function(e) {
    e.preventDefault();
  },

  onRender: function() {
    // the Dom is ready you can now use the ui hash
  },

  onInitLocal: function() {}
});

describe("Base View", () => {
  beforeAll(() => {
    document.body.innerHTML =
      '<div class="testView">' +
      '  <span id="username" />' +
      '  <button id="btnSubmit" />' +
      "</div>";
  });

  it("can test", () => {
    expect(true).toBeTruthy();
  });

  it("init gets called", () => {
    var spy = jest
      .spyOn(testView.prototype, "initialize")
      .mockImplementation(jest.fn);

    const actual = new testView();
    expect(spy).toHaveBeenCalled();

    spy.mockReset();
    spy.mockRestore();
  });

  it("init can call other methods", () => {
    var spy = jest
      .spyOn(testView.prototype, "onInitLocal")
      .mockImplementation(jest.fn);

    const actual = new testView();
    expect(spy).toHaveBeenCalled();

    spy.mockReset();
    spy.mockRestore();
  });

  describe("After Render", () => {
    it("onRender gets called", () => {
      var spy = jest
        .spyOn(testView.prototype, "onRender")
        .mockImplementation(jest.fn);

      let actual = new testView();
      actual.render();
      expect(spy).toHaveBeenCalled();

      spy.mockReset();
      spy.mockRestore();
    });

    it("Event hash hooks up to methods using event and ui hash", () => {
      var spy = jest
        .spyOn(testView.prototype, "onbtnSubmit")
        .mockImplementation(jest.fn);

      let sut = new testView();
      sut.render();

      $("#btnSubmit").click();

      expect(spy).toHaveBeenCalled();

      spy.mockReset();
      spy.mockRestore();
    });
  });
});
