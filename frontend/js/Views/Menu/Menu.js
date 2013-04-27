/**
 * Menu View
 */
define([
  'app',
  'backbone',
  'underscore',

  'Models/User',

  'Views/Menu/Login',
  'Views/Menu/UserPanel'

], function(App, Backbone, _, User) {
  var Menu = App.Views.BaseView.extend({

    events: {

    },

    initialize: function() {
      User.on({
        logged: function() {
          this.renderUserPanel();
        },
        logout: function() {
          this.renderLoginForm();
        }
      }, this);

      this.render();
    },

    render: function() {
      if (!User.id) {
        this.renderLoginForm();
      } else {
        this.renderUserPanel();
      }

      return this;
    },

    renderLoginForm: function() {
      var LoginView = new App.Views.Menu.Login();

      LoginView.render();
    },

    renderUserPanel: function() {
      var UserPanelView = new App.Views.Menu.UserPanel();

      UserPanelView.render();
    }

  });

  App.Views.Menu = App.Views.Menu || {};
  App.Views.Menu.Menu = Menu;
});
