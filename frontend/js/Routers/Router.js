/**
 * Index Router
 */
define([
  'app',
  'backbone',
  'underscore',

  'Views/Home/Subscribe',
  'Views/User/Register',
  'Views/User/Plan'

], function(App, Backbone, _) {
  var Router = Backbone.Router.extend({

    initialize: function() {
      //
    },

    routes: {
      '': 'indexAction',
      'register': 'registerAction',
      'plan': 'planAction'
    },

    indexAction: function() {
      var view = new App.Views.Home.Subscribe();

      App.content.html(view.render().el);
    },

    registerAction: function() {
      var view = new App.Views.User.Register();

      App.content.html(view.render().el);
    },

    planAction: function(){
      var view = new App.Views.User.Plan();

      App.content.html(view.render().el);
    }

  });

  App.Router = new Router();
});
