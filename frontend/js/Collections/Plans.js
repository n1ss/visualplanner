/**
 * Tracks Api Collection
 */
define([
  'app',
  'backbone',
  'underscore',

  'Models/Plan'

], function(App, Backbone, _) {
  var Plans = Backbone.Collection.extend({

    urlRoot: '/api/plans',

    model: App.Models.Plan,

    initialize: function(models, options) {
      //
    }

  });

  App.Collections.Plans = Plans;
});
