/**
 * Index Router
 */
define([
  'app',
  'backbone',
  'underscore',

  'Views/Home/Subscribe'

], function(App, Backbone, _) {
  var Router = Backbone.Router.extend({

    initialize: function() {
      //
    },

    routes: {
      '': 'indexAction'
    },

    indexAction: function() {
      var view = new App.Views.Home.Subscribe();

      App.content.html(view.render().el);
    }

  });

  App.Router = new Router();
});
