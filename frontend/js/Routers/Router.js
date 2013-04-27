/**
 * Index Router
 */
define([
  'app',
  'backbone',
  'underscore',

  'Models/User',

  'Views/Home/Subscribe',
  'Views/Base/Static',
  'Views/User/Register',
  'Views/User/Plan',
  'Views/User/Plans',
  'Views/User/Account'

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
      'logout': 'logoutAction',

      'plan': 'planAction',       // 'plan/:id'  : 'planAction',
      'plans': 'plansAction',
      'account': 'userAccount',

      'static/:page': 'staticAction',

      '*actions': 'defaultAction'
    },

    indexAction: function() {
      var view = new App.Views.Home.Subscribe();
    },

    logoutAction: function() {
      App.Network.send({
        url: '/api/user/logout',
        success: function(data) {
          User.trigger('logout');
        }
      });
    },

    registerAction: function() {
      var view = new App.Views.User.Register();

      App.content.html(view.render().el);
    },

    planAction: function(id) {
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
    },

    userAccount: function() {
      if (this.checkAutch() === false) {
        return;
      }

      var view = new App.Views.User.Account();

      App.content.html(view.render().el);
    },

    staticAction: function(page) {
      var view = new App.Views.Base.Static({
        page: page
      });

      App.content.html(view.render().el);
    },

    defaultAction: function() {
      App.Router.navigate('/', {trigger: true, replace: false});
    }

  });

  App.Router = new Router();
});
