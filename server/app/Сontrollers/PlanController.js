/**
 * User Controller
 */
var mongoose = require('mongoose')
    async = require('async')
  , Plan = mongoose.model('Plan')
  , UserPlan = mongoose.model('UserPlan')

/**
 * Create new plan
 * @param  {Object}   req
 * @param  {Object}   res
 * @return {Response}
 */
exports.create = function(req, res) {
  var plan = new Plan(req.body);
  plan.save(function (err) {
    if (err) {
        return res.json(err);
    } else {
        var userPlan = new UserPlan();
        userPlan.user = req.user;
        userPlan.plan = plan;
        userPlan.save(function (err) {
            if (err) return res.json(500, err);

            return res.json({
                status: true,
                plan: plan
            });
        });
    }
  });
}

/**
 * Remove plan
 * @param  {Object}   req
 * @param  {Object}   res
 * @return {Response}
 */
exports.delete = function(req, res) {
    var planId = req.param('id');

    Plan
        .findOne({id: planId}, function(err, plan) {
            if (err) return res.json(500, err);

            UserPlan
                .findOne({
                    user: req.user,
                    plan: plan
                }, function (err, userPlan) {
                    userPlan.remove(function(error) {
                        if (error) return res.json(500, error);
                        // TODO: probably use assync here?
                    });
                });

            plan.remove(function(error) {
                if (err) return res.json(500, err);

                return res.json({
                    status: true
                });
            });
        });
}