/**
 * Connection Raphael
 */
define([
  'app',
  'backbone',
  'underscore'

], function(App, Backbone, _) {
  Raphael.fn.connection = function (obj1, obj2, line, bg, subtasks) {
    if (obj1.line && obj1.from && obj1.to) {
      line = obj1;
      obj1 = line.from;
      obj2 = line.to;
    }
    var bb1 = obj1.getBBox(),
      bb2 = obj2.getBBox(),
      p = [
        {x: bb1.x + bb1.width / 2, y: bb1.y},
        {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height},
        {x: bb1.x, y: bb1.y + bb1.height / 2},
        {x: bb1.x + bb1.width, y: bb1.y + bb1.height / 2},
        {x: bb2.x + bb2.width / 2, y: bb2.y},
        {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height},
        {x: bb2.x, y: bb2.y + bb2.height / 2},
        {x: bb2.x + bb2.width, y: bb2.y + bb2.height / 2}
      ],
      d = {}, dis = [];
    for (var i = 0; i < 4; i++) {
      for (var j = 4; j < 8; j++) {
        var dx = Math.abs(p[i].x - p[j].x),
          dy = Math.abs(p[i].y - p[j].y);
        if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
          dis.push(dx + dy);
          d[dis[dis.length - 1]] = [i, j];
        }
      }
    }
    if (dis.length == 0) {
      var res = [0, 4];
    } else {
      res = d[Math.min.apply(Math, dis)];
    }
    var x = p[res[0]].x,
      y = p[res[0]].y,
      fx = p[res[1]].x,
      fy = p[res[1]].y;

    var height, length, path,
      fixedRadius = 10;

    var radius = Math.min(fx > x ? (fx - x ) / 2 : (x - fx ) / 2, fy > y ? (fy - y ) / 2 : (y - fy ) / 2, fixedRadius);


    if ((bb1.x + bb1.width / 2 < bb2.x && bb2.x <= bb1.x + bb1.width) || (bb1.x <= bb2.x + bb2.width && bb1.x > bb2.x + bb2.width / 2)) {
      if (fx >= x && fy > y) {
        length = fx - x;
        height = (fy - y) / 2;

        path = [
          "M", x, y,
          "L", x + length - radius, y,
          "A", radius, radius, 0, 0, 1, fx, fy - height * 2 + radius ,
          "L", fx, fy
        ];
      } else if (x >= fx && fy > y) {
        length = x - fx;
        height = (fy - y) / 2;

        path = [
          "M", x, y,
          "L", x - length + radius, y,
          "A", radius, radius, 0, 0, 0, x - length, y + radius,
          "L", fx, fy
        ];
      }
    } else {

      if (fx > x && fy > y && ((bb1.x < bb2.x && bb1.x > bb2.x + bb2.width / 2) || (bb1.x + bb1.width < bb2.x))) {
        length = (fx - x) / 2 - radius;
        height = fy - y - radius;

        path = [
          "M", x, y,
          "L", x + length, y,
          "A", radius, radius, 0, 0, 1, x + length + radius, y + radius,
          "L", x + length + radius, y + height,
          "A", radius, radius, 0, 0, 0, x + length + radius * 2, y + height + radius,
          "L", fx, fy
        ];
      } else if (x > fx && fy > y && ((bb1.x < bb2.x && bb1.x + bb1.width / 2 < bb2.x) || !(bb1.x <= bb2.x + bb2.width /2 && bb1.x > bb2.x))) {
        length = (x - fx) / 2;
        height = fy - y;

        path = [
          "M", x, y,
          "L", x - length + radius, y,
          "A", radius, radius, 0, 0, 0, x - length, y + radius,
          "L", x - length, y + height - radius,
          "A", radius, radius, 0, 0, 1, fx + length - radius, fy,
          "L", fx, fy
        ];
      } else if (x >= fx && fy > y) {
        length = x - fx;
        height = (fy - y) / 2;

        path = [
          "M", x, y,
          "L", x, y + height - radius,
          "A", radius, radius, 0, 0, 1, fx + length - radius, y + height,
          "L", x - length + radius, y + height ,
          "A", radius, radius, 0, 0, 0, fx, fy - height + radius ,
          "L", fx, fy
        ];
      } else if (fx >= x && fy > y) {
        length = fx - x;
        height = (fy - y) / 2;

        path = [
          "M", x, y,
          "L", x, y + height - radius,
          "A", radius, radius, 0, 0, 0, x + radius, y + height,
          "L", x + length - radius, y + height ,
          "A", radius, radius, 0, 0, 1, fx, fy - height + radius ,
          "L", fx, fy
        ];
      }
    }

    if (numSubtasks) {
      // calculating line lengths
      var px, py, longestLine;
      path.forEach(function(el, i){
        if (el === 'M') {
          px = path[i+1]; py = path[i+2]

        } else if (el === 'A') {
          px = path[i+6]; py = path[i+7]

        } else if (el === 'L') {
          var cx = path[i+1],
              cy = path[i+2],
              lineLength = Math.sqrt( (px - cx)*(px - cx) + (py - cy)*(py - cy) );

          if (!longestLine || longestLine[4] < lineLength)
            longestLine = [px, py, cx, cy, lineLength];

          px = cx; py = cy;
        }
      });

      // Subtasks start points
      var numSubtasks = subtasks.length;
      for (var i = 0; i < numSubtasks; i++) {
        subtasks[i].connectorx = longestLine[0] + (i + 1)*(longestLine[2] - longestLine[0])/(numSubtasks + 1);
        subtasks[i].connectory = longestLine[1] + (i + 1)*(longestLine[3] - longestLine[1])/(numSubtasks + 1);
      }
    }

    if (line && line.line) {
      line.bg && line.bg.attr({path: path});
      line.line.attr({path: path, "stroke-width": 2});
    } else {
      var color = typeof line == "string" ? line : "#000";
      return {
        bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 2}),
        line: this.path(path).attr({stroke: color, fill: "none"}),
        from: obj1,
        to: obj2
      };
    }
  };
});
