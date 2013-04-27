/**
 * Index Router
 */
define([
  'app',
  'backbone',
  'underscore',

  'Models/User',

  'Views/Home/Subscribe',
  'Views/User/Register',
  'Views/User/Plan',
  'Views/User/Plans'

], function(App, Backbone, _, User) {
  var Router = Backbone.Router.extend({

    initialize: function() {
      
    },

    /**
     * Check is user login
     * @return {Boolean}
     */
    checkAutch: function() {
      if (!User.id) {
        App.Router.navigate('/', {trigger: true, replace: false});

        return false;
      }

      return true;
    },

    routes: {
      '': 'indexAction',
      'register': 'registerAction',
      'plan': 'planAction',
      'plans': 'plansAction'
    },

    indexAction: function() {
      var view = new App.Views.Home.Subscribe();
    },

    registerAction: function() {
      var view = new App.Views.User.Register();

      App.content.html(view.render().el);
    },

    planAction: function() {
      if (this.checkAutch() === false) {
        return;
      }

      var view = new App.Views.User.Plan();

      App.content.html(view.render().el);
    },

    plansAction: function() {
      if (this.checkAutch() === false) {
        return;
      }

      var view = new App.Views.User.Plans();

      App.content.html(view.render().el);
    }

  });

  App.Router = new Router();
});
