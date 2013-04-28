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
      var mindmap = this;
      var paper = this.paper;

      var milestone = new Milestone({
        paper: paper,
        mindmap: mindmap
      }).render();

      this.milestones.push(milestone);

      if (this.milestones.length > 1) {
        this.connections.push(paper.connection(this.milestones[this.milestones.length - 2], this.milestones[this.milestones.length - 1], "#34495E"));
      }
    },

    removeMilestone: function(id) {

    },

    addConnect: function(firstMilestone, secondMilestone) {

    },

    removeConnect: function(id) {

    }
  };


  _.extend(Mindmap.prototype, Backbone.Events);

  return Mindmap;
});