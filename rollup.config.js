import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import uglify from "rollup-plugin-uglify";
import babel from "rollup-plugin-babel";

const base = {
  input: "src/main.js",
  external: ["jquery", "backbone", "underscore"],
  output: {
    file: "dist/backbone.waiter.js",
    format: "umd",
    name: "Backbone.Waiter",
    sourcemap: true,
    globals: {
      jquery: "$",
      jquery: "jQuery",
      backbone: "Backbone",
      underscore: "_"
    }
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }), // tells Rollup how to find date-fns in node_modules
    commonjs({}), // converts date-fns to ES modules
    babel({
      exclude: "node_modules/**" // only transpile our source code
    })    
  ]
};

const min = Object.assign({}, base, {
	output: Object.assign({}, base.output, {file: 'dist/backbone.waiter.min.js'}),
	plugins: [
		resolve({
		  jsnext: true,
		  main: true,
		  browser: true
		}), // tells Rollup how to find date-fns in node_modules
		commonjs({}), // converts date-fns to ES modules
		babel({
		  exclude: "node_modules/**" // only transpile our source code
		}),
		uglify()    
	  ]
});

const bundle = Object.assign({}, base, {
	external: ["jquery"],
	output: Object.assign({}, base.output, {
		file: 'dist/backbone.waiter.bundle.js'
	})	
})

const bundleMin = Object.assign({}, bundle, {	
	output: Object.assign({}, bundle.output, {
		file: 'dist/backbone.waiter.bundle.min.js'
	}),
	plugins: [
		resolve({
		  jsnext: true,
		  main: true,
		  browser: true
		}), // tells Rollup how to find date-fns in node_modules
		commonjs({}), // converts date-fns to ES modules
		babel({
		  exclude: "node_modules/**" // only transpile our source code
		}),
		uglify()    
	  ]
})

export default [base, min, bundle, bundleMin ];
