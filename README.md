


# backbone.waiter
tiny library (**1KB gziped**) to add backbone structure and a marionette feel to 
your server side views.

## Purpose
I really like the structure backbone and marionette give the JS code for your views. 
This library is to help give that structure to views that are rendered server side.
via .NET, PHP, or whatever server language you are using.

## Inspiration
Most of the base code was borrowed from [backbone.marionette](https://github.com/marionettejs/backbone.marionette) v2.4. 
The only reason this exist and not just use all of Marionette is for a special use case.
Where I wanted the JS code to be as small as possible and I didn't need all the other goodness Mn provides.

So I just cherry picked the smallest amount of code I could to get what I wanted. 
A single base view with the ui hash. 

Unlike Marionette there is no automatic event binding to backbone models or support for 
child views or templates. This is b/c this library is only meant to be used when dealing 
only and directly with server side views. If you need more of what Marionette provides you 
should use the real thing.

## Dependencies
1. jQuery
2. underscore / lodash
3. backbone

## BaseView
```javascript	
var MyView = backbone.waiter.BaseView.extend({
	el: '.mainView', //where the view starts 

	initialize: function(){
		//called when view is instantiated
		//the ui hash and events are not ready yet
	},	
	
	ui: {
		btnSubmit: '#btnSubmit',
		txtSomeInput: '#txtSomeInput'
	},
	
	events:{
		'click @ui.btnSubmit': 'onbtnSubmit'
	},

	onbtnSubmit: function(e){
		e.preventDefault();
		var newVal = this.ui.txtSomeInput.val();
	},

	onRender: function(){
		//the Dom is ready you can now use the ui hash
	}


});

$(function(){
	if($('.mainView').length > 0) {
		// initialize the view
		var _myView = new MyView(); 
		
		//hook up ui and events
		_myView.render();
	}

});

```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run all tests
npm test
```


## License
**MIT**
