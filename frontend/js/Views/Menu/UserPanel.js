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

    },

    initialize: function() {

    },

    render: function() {
      this.$el.html(tmpl.render('Menu/UserPanel', User.toJSON()));

      return this;
    }

  });

  App.Views.Menu = App.Views.Menu || {};
  App.Views.Menu.UserPanel = UserPanel;
});
