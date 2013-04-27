/**
 * Network Class
 */
define([
  'app',
  'backbone',
  'underscore'

], function(App, Backbone, _) {
  var Network = function() {
    if (typeof Network.instance === 'object') {
      return Network.instance;
    }

    Network.instance = this;
  };

  Network.prototype = {

    /**
     * Send request to server api
     * @param  {Object} options
     * @param  {Object} config
     * @return {Deferred|Boolean}
     */
    send: function(options, config) {
      _.extend({
        dataType: 'json'
      }, options);

      if (config && config.isLogged === true) {
        if (!Planner.isLogged) {
          alert('you should be logged in');

          return false;
        }
      }

      return $.ajax(options);
    }

  };

  App.Network = new Network();
});
