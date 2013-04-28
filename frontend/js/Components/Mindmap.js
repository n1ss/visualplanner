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
    this.paper = new Raphael(id, this.canvas.width(), 6000);

    this.render();
  };

  Mindmap.prototype = {

    /**
     * Render mind map
     */
    render: function () {
      this.addTimeline();
    },

    addTimeline: function (days) {
      var daysCount = days || 31;

      for (var i = 0; i < daysCount; i += 1) {
        var color = '#ECF0F1';
        var height = this.paper.height / daysCount;
        var coord = (height * i).toFixed(0);
        this.paper.path(["M", 0, coord, "H", this.paper.width]).attr({ stroke: '#E4E9EA', 'stroke-width': 1 });

        if(i == 0) coord = 0;
        if(i % 2 == 0) color = '#E4E9EA';
        this.paper.rect(0, coord , 70, height).attr({fill: color, stroke: 0});
        this.paper.text(35, coord, i + 1 + "").attr({
          font: '48px Arial',
          fill: "#fff",
          opacity: 0.5
        });
      }
    },

    addMilestone: function(options) {
      var mindmap = this;
      var paper = this.paper;

      var milestone = new Milestone(_.extend({
        paper: paper,
        mindmap: mindmap,
        uuid: this.generateUUID()
      }, options)).render();

      this.milestones.push(milestone);

      if (this.milestones.length > 1) {
        this.connections.push(paper.connection(this.milestones[this.milestones.length - 2], this.milestones[this.milestones.length - 1], "#34495E"));
      }
    },

    /**
     * Give objects from server
     */
    fetch: function() {

    },

    removeMilestone: function(id) {

    },

    addConnect: function(firstMilestone, secondMilestone) {

    },

    removeConnect: function(id) {

    },

    generateUUID: function(){
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
  };


  _.extend(Mindmap.prototype, Backbone.Events);

  return Mindmap;
});