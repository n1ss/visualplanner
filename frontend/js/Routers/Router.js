/**
 * Index Router
 */
define([
  'app',
  'backbone',
  'underscore',

  'Views/Home/Login'

], function(App, Backbone, _) {
  var Router = Backbone.Router.extend({

    initialize: function() {
      //
    },

    routes: {
      '': 'indexAction'
    },

    indexAction: function() {
      var view = new App.Views.Home.Login();

      App.content.html(view.render().el);
    }

  });

  App.Router = new Router();
});
