


# backbone.waiter
tiny library (**1KB gziped**) to add backbone structure and a marionette feel to your server side views.

## Purpose
I really like the structure backbone and marionette give the JS code for your views. This library is to help give that structure to views that are rendered server side.
via .NET, PHP, or whatever server language you are using.

## Inspiration
Most of the base code was borrowed from [backbone.marionette](https://github.com/marionettejs/backbone.marionette) v2.4. The only reason this exist and not just use all of Marionette is for a special use case. 
Where I wanted the JS code to be as small as possible and I didn't need all the other goodness Mn provides.

So I just cherry picked the smallest amount of code I could to get what I wanted. A single base view with the ui hash. 

Unlike Marionette there is no automatic event binding to backbone models or support for child views or templates. This is b/c this library is only meant to be used when dealing only and directly with server side views. If you need more of what Marionette provides you should use the real thing.

## Dependencies
1. jQuery
2. underscore / lodash
3. backbone

## Installation
**npm**
- ```npm install backbone.waiter --save-dev```

**bower**
- ```bower install backbone.waiter ```

**jspm**
- ```jspm install npm:backbone.waiter ```

## Dist Files
There are two main packages 

* ```backbone.waiter.js``` 
	* The default package
	* Only the core code
* ```backbone.waiter.bundle.js``` 
	* Bundled version
		* includeds Backbone and Underscore
	* **Does not include jQuery** 
		* this is to let you pick your own version of jQuery should work with any version Backbone will work with. 


## Usage
### BaseView
```javascript	
var MyView = Backbone.Waiter.BaseView.extend({
	el: '.mainView', // where the view starts 

	initialize: function(){
		// called when view is instantiated
		// the ui hash and events are not ready yet
	},	
	
	// jQuery selectors stored in a hash
	ui: {
		// prop: selector
		btnSubmit: '#btnSubmit'
	},	
		
	events:{
		// event selector/@ui.prop: function
		'click @ui.btnSubmit': 'onbtnSubmit'
	},

	onbtnSubmit: function(e){
		e.preventDefault();
		alert('I got clicked');
	},

	onRender: function(){
		// the Dom is ready you can now use the ui hash
	}
});


```

### Render the view
To get the view to hook up events and initialize ```render()``` needs to be called. 

This can be done anywhere you want on the page itself or as part of the view code.

```javascript
$(function(){
	if($('.mainView').length > 0) {
		// initialize the view
		var _myView = new MyView(); 

		// hook up ui and events
		_myView.render();
	}
});
```

### AutoLoader
To assist in bundling code the autoloader can also be used to test what views should be loaded when the page renders. 

It simply checks your ```el``` against the dom and if its found initializes the view and renders it.  

```javascript
// import/require  the views
var FooView = require('./views/FooView')
var BarView = require('./views/BarView ')

// create view array to store them
var viewArray = [
  FooView,
  BarView
]

// loop throuch each view 
$(function () {
  for (var i = 0; i < viewArray.length; i++) {
    Waiter.AutoLoader(viewArray[i])
  }
})

```

## [Changelog](CHANGELOG.md)
Updates and changes between versions will be kept here.

## [License](LICENSE)
**MIT**
