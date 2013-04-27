/**
 * Track Api Model
 */
define([
  'app',
  'backbone',
  'underscore'

], function(App, Backbone, _) {
  var Plan = Backbone.Model.extend({

    idAttribute: '_id',

    url: '/api/plan',

    validate: function(attributes) {
      //
    },

    initialize: function(attributes, options) {
      //
    }

  });

  App.Models.Plan = Plan;
});
