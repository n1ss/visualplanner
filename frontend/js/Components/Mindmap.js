/**
 * Mindmap Mudule
 */
define([
  'app',
  'backbone',
  'underscore',

  'Components/Milestone'

], function(App, Backbone, _, Milestone) {
  var Mindmap = function(id) {
    if (typeof Mindmap.instance === 'object') {
      return Mindmap.instance;
    }

    Mindmap.instance = this;

    // options
    this.milestones = {};
    this.timeline = {};
    this.canvas = $('#' + id);
    this.paper = Raphael(id, canv.width(), 800);
  };

  var proto = Mindmap.prototype;

  _.extend(proto, Backbone.Events);

  /**
   * Render mind map
   */
  proto.render = function() {

  };

  /**
   * Give objects from server
   */
  proto.fetch = function() {

  };

  proto.addMilestone = function(options) {

  };

  proto.removeMilestone = function(id) {

  };

  proto.addConnect = function(firstMilestone, secondMilestone) {

  };

  proto.removeConnect = function(id) {

  };

  return new Mindmap();
});