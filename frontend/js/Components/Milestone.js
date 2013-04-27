/**
 * Milestone Mudule
 */
define([
  'app',
  'backbone',
  'underscore'

], function(App, Backbone, _) {
  var Milestone = function(options) {
    _.extend(this, options);
  };

  var proto = Milestone.prototype;

  _.extend(proto, Backbone.Events);

  proto.render = function() {

  };

  return Milestone;
});
