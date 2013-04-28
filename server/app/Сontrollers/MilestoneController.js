var mongoose = require('mongoose'),
  async = require('async'),
  Milestone = mongoose.model('Milestone');


exports.create = function (req, res) {
  var milestone = new Milestone(req.body);
  milestone.save(function (err) {
    if (err) {
      return res.json(err);

    } else {
      res.json("create", "created");
    }
  });
};

exports.get = function (req, res) {
  res.json("get", "got");
};


exports.put = function (req, res) {
  res.json("put", "put");
};

exports.delete = function (req, res) {
  res.json("delete", "deleted");
};
