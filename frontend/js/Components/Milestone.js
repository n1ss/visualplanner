/**
 * Milestone Mudule
 */
define([
  'app',
  'backbone',
  'underscore',

  'Components/Raphael/Connection'

], function(App, Backbone, _) {
  var Milestone = function(options) {
    this.options = options;

    var milestoune = this;
    var paper = this.options.paper;
    var connections = this.options.mindmap.connections;

    this.dragger = function () {
      milestoune.elems.forEach(function(elem) {
        // Original coords for main element
        elem.ox = elem.type == "ellipse" ? elem.attr("cx") : elem.attr("x");
        elem.oy = elem.type == "ellipse" ? elem.attr("cy") : elem.attr("y");
      });

      this.animate({"fill-opacity": .6}, 500);
    };

    this.move = function (dx, dy, x, y, e) {
      milestoune.elems.forEach(function(elem) {
        // Move main element
        var att = elem.type == "ellipse" ? {cx: elem.ox + dx, cy: elem.oy + dy} : 
                                           {x: elem.ox + dx, y: elem.oy + dy};
        elem.attr(att);
      });

      for (var i = connections.length; i--;) {
        paper.connection(connections[i]);
      }

      paper.safari();
    };

    this.up = function () {
      this.animate({"fill-opacity": 1}, 500);
    }
  };

  Milestone.prototype = {

    /**
     * Render milestine
     * @return {Object}
     */
    render: function() {
      var paper = this.options.paper;

      var block = paper.rect(0, 0, 230, 50, 10).attr({
        "fill": "#2ECC71",
        "fill-opacity": 1,
        "stroke-width": 0,
        "cursor": "move"
      });
      var secondTitle = paper.text(60, 12, "24 hits").attr({
        font: '12px Helvetica, Arial',
        fill: "#fff"
      });
      var title = paper.text(60, 27, "22 September 2008").attr({
        font: '12px Helvetica, Arial',
        fill: "red"
      });

      this.elems = [title, secondTitle, block];

      label = paper.set.apply(this, this.elems);
      label.drag(this.move, this.dragger, this.up);

      return block;
    }

  };

  _.extend(Milestone.prototype, Backbone.Events);

  return Milestone;
});
