/**
 * Initialization application 
 */

// Set confug for requirejs
require.config({
  locale: "ru-ru",
  paths: {
    underscore: '../vendors/underscore/underscore',
    backbone: '../vendors/backbone/backbone',
    handlebars: '../vendors/handlebars.js/dist/handlebars',
    tmpl: 'Classes/Template',
    eve: '../libs/eve/eve',
    raphael: '../vendors/raphael/raphael-min'
  },
  shim: {
    'eve': {
      exports: 'eve'
    },
    'raphael': {
      deps: ['eve'],
      exports: 'Raphael'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore'],
      exports: 'Backbone'
    },
    'handlebars': {
      exports: 'Handlebars'
    }
  }
});

require([
  'app',
  'backbone',
  'underscore',

  'Models/User',

  'eve',

  'Routers/Router',
  'Views/Application'

], function(App, Backbone, _, User, eve) {
  window.eve = eve;
  var application = new App.Views.Application();

  _.extend(App, application);

  Backbone.history.start({pushState: true});
});
