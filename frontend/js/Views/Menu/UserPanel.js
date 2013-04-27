/**
 * Login View
 */
define([
  'app',
  'backbone',
  'underscore',
  'tmpl',

  'Models/User',

  'Classes/Form',
  'Classes/Network',

  'Views/Base/View'

], function(App, Backbone, _, tmpl, User, Form) {
  var UserPanel = App.Views.BaseView.extend({

    el: '.fn-user-side',

    events: {
      'click .fn-logout': 'logout'
    },

    initialize: function() {

    },

    render: function() {
      this.$el.html(tmpl.render('Menu/UserPanel', User.toJSON()));

      return this;
    },

    logout: function(e) {
      e.preventDefault();

      App.Network.send({
        url: '/api/user/logout',
        context: this,
        success: function(data) {
          User.trigger('logout');
        }
      });
    }

  });

  App.Views.Menu = App.Views.Menu || {};
  App.Views.Menu.UserPanel = UserPanel;
});
