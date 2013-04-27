/**
 * User Model
 */
define([
  'app',
  'backbone',
  'underscore'

], function(App, Backbone, _, Tracks) {
  var User = Backbone.Model.extend({

    urlRoot: '/api/user',

    initialize: function() {
      this.on({
        'logged': this.logged,
        'logout': this.logout
      });

      if (Planner.isLogged) {
        this.set(Planner.user);
        this.logged();
      }
    },

    /**
     * Run after user login
     */
    logged: function() {
      Planner.isLogged = true;

      this.fetch({
        success: function() {
          this.trigger('loaded');
          this.set('loaded', true);
        }.bind(this)
      });
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
