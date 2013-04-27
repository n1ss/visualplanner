/**
 * Menu View
 */
define([
  'app',
  'backbone',
  'underscore',

  'Views/Menu/Login'

], function(App, Backbone, _) {
  var Menu = App.Views.BaseView.extend({

    events: {
      //
    },

    initialize: function() {
      var LoginView = new App.Views.Menu.Login();

      LoginView.render();
    },

    render: function() {
      //

      return this;
    }

  });

  App.Views.Menu = App.Views.Menu || {};
  App.Views.Menu.Menu = Menu;
});
