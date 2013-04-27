/**
 * User Model
 */
define([
  'app',
  'backbone',
  'underscore'

], function(App, Backbone, _) {
  var User = Backbone.Model.extend({

    urlRoot: '/api/user',

    initialize: function() {
      this.on({
        'logged': this.logged,
        'logout': this.logout
      });

      if (Planner.isLogged) {
        this.logged(Planner.user);
      }
    },

    /**
     * Run after user login
     */
    logged: function(data) {
      this.set(data);

      Planner.isLogged = true;
    },

    /**
    * Run after user logout
    */
    logout: function() {
      Planner.isLogged = false;
      this.clear();
      this.off('loaded');
    }

  });

  return new User();
});
