/**
 * Milestone Mudule
 */
define([
  'app',
  'backbone',
  'underscore',

  'Models/Milestone',
  'Components/Mindmap',
  'Components/Raphael/Connection'

], function(App, Backbone, _, Mindmap) {
  var Milestone = function(options) {
    this.options = options;

    this.milestoneModel = new App.Models.Milestone();

    var milestone = this;
    var paper = this.options.paper;
    var connections = this.options.mindmap.connections;

    /**
     * Start dragger
     */
    this.dragger = function () {
      milestone.elems.forEach(milestone.prepareElement);

      this.animate({"fill-opacity": 0.6}, 500);
    };

    /**
     * On move event
     */
    this.move = function (dx, dy, x, y, e) {
      if (this.data('noMove')) {
        return;
      }

      milestone.elems.forEach(function(elem) {
        milestone.moveElement(elem, dx, dy, x, y, e);
      });

      for (var i = connections.length; i--;) {
        paper.connection(connections[i]);
      }

      paper.safari();
    };

    /**
     * On drop event
     */
    this.up = function () {
      this.animate({"fill-opacity": 1}, 500);
      milestone.milestoneModel.save({
        title: milestone.options.title,
        description: "",
        position: {
          x: milestone.addBlock.getBBox().x,
          y: milestone.addBlock.getBBox().y
        }
      });
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
    };

    /**
     * On start event on create new milestone
     */
    this.draggerAdd = function(x, y, e) {
      if (milestone.tempPoint) {
        return;
      }

      var stone = milestone.options.mindmap.addMilestone({
        title: 'test',
        noConnect: true,
        x: milestone.block.attr('x'),
        y: milestone.block.attr('y') - window.pageYOffset
      });

      milestone.tempPoint = stone;
      milestone.tempPoint.elems.forEach(milestone.prepareElement);

      milestone.options.mindmap.addConnect(milestone.block, milestone.tempPoint.block);
    };

    /**
     * On move event on create new milestone
     */
    this.moveAdd = function(dx, dy, x, y, e) {
      milestone.tempPoint.elems.forEach(function(elem) {
        milestone.moveElement(elem, dx, dy, x, y, e);
      });

      for (var i = connections.length; i--;) {
        paper.connection(connections[i]);
      }
    };

    /**
     * On up event on create new milestone
     */
    this.upAdd = function() {
      delete milestone.tempPoint;
    };

    /**
     * Set params for prepearing animation
     */
    this.prepareElement = function(elem) {
      elem.ox = elem.type == "ellipse" ? elem.attr("cx") : elem.attr("x");
      elem.oy = elem.type == "ellipse" ? elem.attr("cy") : elem.attr("y");
    };

    /**
     * Set params for animation
     */
    this.moveElement = function(elem, dx, dy, x, y, e) {
      if (elem.type == "ellipse") {
        var att = {cx: elem.ox + dx, cy: elem.oy + dy};
      } else {
        var att = {x: elem.ox + dx, y: elem.oy + dy};
      }
                                         
      elem.attr(att);
    }
  };

  Milestone.prototype = {

    /**
     * Render milestine
     * @return {Object}
     */
    render: function(options) {
      var paper = this.options.paper;
      var milestones = this.options.mindmap.milestones || [];

      if (options.x === undefined) {
        var x = 80, y = 5;

        if (milestones.length >= 1) {
          x = milestones[milestones.length - 1].getBBox().x;
          y = milestones[milestones.length - 1].getBBox().y + 100;
        }
      } else {
        var x = options.x, y = options.y;
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
      }).hide().data("noMove", true);
      this.title = paper.text(x + 10, y + 15, this.options.title).attr(txtStyle).attr({
        'font': '13px Arial'
      });
      this.secondTitle = paper.text(x + 12, y + 37, "22 September 2008").attr(txtStyle).attr({
        'font': '10px Arial'
      });

      this.elems = [this.title, this.secondTitle, this.block, this.addBlock];

      this.label = paper.set.apply(this, this.elems);
      
      this.label.drag(this.move, this.dragger, this.up);
      this.label.hover(this.hover, this.over);

      this.addBlock.drag(this.moveAdd, this.draggerAdd, this.upAdd);

      this.milestoneModel.save({
        title: this.options.title,
        description: "",
        position: {
          x: this.addBlock.getBBox().x,
          y: this.addBlock.getBBox().y}
      });

      return this;
    }

  };

  _.extend(Milestone.prototype, Backbone.Events);

  return Milestone;
});
