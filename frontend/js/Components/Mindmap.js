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
    // options
    this.milestones = [];
    this.connections = [];
    this.timeline = {};
    this.canvas = $('#' + id);
    this.paper = new Raphael(id, this.canvas.width(), 800);
  };

  Mindmap.prototype = {

    /**
     * Render mind map
     */
    render: function() {

    },

    /**
     * Give objects from server
     */
    fetch: function() {

    },

    addMilestone: function(options) {
      var milestone = new Milestone({
        paper: this.paper,
        mindmap: this
      }).render();

      this.milestones.push(milestone);

      if (this.milestones.length > 1) {
        this.addConnect(this.milestones[this.milestones.length - 2], this.milestones[this.milestones.length - 1]);
      }
    },

    removeMilestone: function(id) {

    },

    addConnect: function(firstMilestone, secondMilestone) {
        this.connections.push(this.paper.connection(firstMilestone, secondMilestone, "#2e616b"));
    },

    removeConnect: function(id) {

    }
  };


  _.extend(Mindmap.prototype, Backbone.Events);

  return Mindmap;
});