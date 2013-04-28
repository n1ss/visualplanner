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

    var uuid = this.options.uuid;

    var milestone = this;
    var paper = this.options.paper;
    var connections = this.options.mindmap.connections;

    /**
     * Start dragger
     */
    this.dragger = function () {
      milestone.elems.forEach(function(elem) {
        elem.ox = elem.type == "ellipse" ? elem.attr("cx") : elem.attr("x");
        elem.oy = elem.type == "ellipse" ? elem.attr("cy") : elem.attr("y");
      });

      this.animate({"fill-opacity": .6}, 500);
    };

    /**
     * On move event
     */
    this.move = function (dx, dy, x, y, e) {
      milestone.elems.forEach(function(elem) {
        if (elem.type == "ellipse") {
          var att = {cx: elem.ox + dx, cy: elem.oy + dy};
        } else {
          var att = {x: elem.ox + dx, y: elem.oy + dy};
        }
                                           
        elem.attr(att);
      });

      for (var i = connections.length; i--;) {
        paper.connection(connections[i]);
      }

      paper.safari();
    };

    /**
     * On drug drop event
     */
    this.up = function () {
      this.animate({"fill-opacity": 1}, 500);
    };

    /**
     * Hover event
     */
    this.hover = function() {
      milestone.addBlock.show().toFront();
    };

    /**
     * On over event
     */
    this.over = function() {
      milestone.addBlock.hide();
    }
  };

  Milestone.prototype = {

    /**
     * Render milestine
     * @return {Object}
     */
    render: function() {
      var paper = this.options.paper;
      var milestones = this.options.mindmap.milestones || [];
      var x = 80, y = 5;

      if (milestones.length >= 1) {
        x = milestones[milestones.length - 1].getBBox().x;
        y = milestones[milestones.length - 1].getBBox().y + 100;
      }

      var txtStyle = {
        'text-anchor': 'start',
        'fill': "#fff",
        "cursor": "move"
      };

      this.block = paper.rect(x, y, 230, 50, 5).attr({
        "fill": "#53bb6f",
        "stroke": "#449158",
        "cursor": "move",
        "fill-opacity": 1,
        "stroke-width": 2
      });
      this.addBlock = paper.ellipse(x + 115, y + 50, 10, 10).attr({
        "fill": "#ffffff",
        "stroke": "#87989a",
        "cursor": "move",
        "stroke-width": 2
      }).hide();
      this.title = paper.text(x + 10, y + 15, this.options.title).attr(txtStyle).attr({
        'font': '13px Arial',
      });
      this.secondTitle = paper.text(x + 12, y + 37, "22 September 2008").attr(txtStyle).attr({
        'font': '10px Arial',
      });

      this.elems = [this.title, this.secondTitle, this.block, this.addBlock];

      label = paper.set.apply(this, this.elems);
      
      label.drag(this.move, this.dragger, this.up);
      label.hover(this.hover, this.over);

      return this.block;
    }

  };

  _.extend(Milestone.prototype, Backbone.Events);

  return Milestone;
});
