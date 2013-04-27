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
     * Call funtion if user is ready
     * @param  {Function} callback
     * @param  {Object}   context
     */
    done: function(callback, context) {
      context = context || this;

      if (this.id) {
        callback.call(context);
      }

      if (this.get('loaded')) {
        callback.call(context);
      }

      this.on('loaded', function() {
        callback.call(context);
      });

      return this;
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
