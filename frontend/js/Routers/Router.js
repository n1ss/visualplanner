/**
 * Index Router
 */
define([
  'app',
  'backbone',
  'underscore'

], function(App, Backbone, _) {
  var Router = Backbone.Router.extend({

    initialize: function() {
      //
    },

    routes: {
      '': 'indexAction'
    },

    indexAction: function() {
      console.log('index page');
    }

  });

  App.Router = new Router();
});
