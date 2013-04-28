var mongoose = require('mongoose'),
  async = require('async'),
  Milestone = mongoose.model('Milestone') ;


exports.create = function(req, res) {
  res.json("create", "create");
};

exports.put = function(req, res) {
  res.json("put", "put");
};

exports.delete = function(req, res) {
  res.json("delete", "delete");
};