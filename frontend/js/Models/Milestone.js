/**
 * Track Api Model
 */
define([
  'app',
  'backbone',
  'underscore'

], function (App, Backbone, _) {
  var Milestone = Backbone.Model.extend({

    idAttribute: "_id",

    url: '/api/milestone',

    validate: function (attributes) {
      //
    },

    initialize: function (attributes, options) {

    }

  });

  App.Models.Milestone = Milestone;
});