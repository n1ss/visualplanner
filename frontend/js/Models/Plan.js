/**
 * Track Api Model
 */
define([
  'app',
  'backbone',
  'underscore',

  'Views/Utilities/Popup',
  'Views/Auth/Login'

], function(App, Backbone, _) {
  var Plan = Backbone.Model.extend({

    urlRoot: '/api/plan',

    validate: function(attributes) {
      //
    },

    initialize: function(attributes, options) {
      //
    }

  });

  App.Models.Plan = Plan;
});
