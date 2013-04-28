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
        var color = '#404546';
        var height = this.paper.height / daysCount;
        var coord = (height * i).toFixed(0);
        this.paper.path(["M", 0, coord, "H", this.paper.width]).attr({ stroke: '#404546', 'stroke-width': 2 });

        if(i == 0) coord = 0;
        if(i % 2 == 0) color = '#7e8b8d';
        this.paper.rect(0, coord , 70, height).attr({fill: color, stroke: 0});
        this.paper.text(35, coord, i + 1 + "").attr({
          font: '48px Arial',
          fill: "#fff",
          opacity: 1
        });
      }

      $("text").each(function(el, index){
        this.setAttribute("y" ,this.getBBox().y + 125);

      })
    },

    addMilestone: function(options) {
      var mindmap = this;
      var paper = this.paper;

      var milestone = new Milestone({
        paper: paper,
        mindmap: mindmap,
        title: options.title
      }).render(options);

      this.milestones.push(milestone.block);

      if (options.noConnect !== true && this.milestones.length > 1) {
        this.addConnect(this.milestones[this.milestones.length - 2], this.milestones[this.milestones.length - 1]);
      }

      return milestone;
    },

    /**
     * Give objects from server
     */
    fetch: function() {

    },

    removeMilestone: function(id) {

    },

    addConnect: function(firstMilestone, secondMilestone) {
      var subtasks = {
        tasks:[],
        newPoint: {}
      };
      var paper = this.paper;
      var connection = paper.connection(firstMilestone, secondMilestone, "#34495E", null, subtasks);
      connection.line.hover(function() {
        subtasks.newPoint.pointer =
            paper.circle(subtasks.newPoint.connectorx, subtasks.newPoint.connectory, 5).attr({fill: "#000", "stroke-width": 2});
      }, function() {
        subtasks.newPoint.pointer.remove();
      }, connection, connection);

      this.connections.push(connection);
    },

    removeConnect: function(id) {

    }
  };


  _.extend(Mindmap.prototype, Backbone.Events);

  return Mindmap;
});