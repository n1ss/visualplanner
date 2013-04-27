/**
 * Application View
 */
define([
  'app',
  'backbone',
  'underscore',
  'tmpl',

  'Views/Base/View'

], function(App, Backbone, _, tmpl) {
  var Login = App.Views.BaseView.extend({

    events: {

    },

    initialize: function() {
      this.$el.html(tmpl.render('Home/Login'));
    },

    render: function() {
      console.log('render login');

      return this;
    }

  });

  App.Views.Home = App.Views.Home || {};
  App.Views.Home.Login = Login;
});
