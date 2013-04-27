/**
 * Index Router
 */
define([
  'app',
  'backbone',
  'underscore',

  'Views/Home/Subscribe',
  'Views/User/Register'

], function(App, Backbone, _) {
  var Router = Backbone.Router.extend({

    initialize: function() {
      //
    },

    routes: {
      '': 'indexAction',
      'register': 'registerAction'
    },

    indexAction: function() {
      var view = new App.Views.Home.Subscribe();

      App.content.html(view.render().el);
    },

    registerAction: function() {
      var view = new App.Views.User.Register();

      App.content.html(view.render().el);
    }

  });

  App.Router = new Router();
});
