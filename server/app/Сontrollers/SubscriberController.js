/**
 * Subscriber Controller
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Subscriber = mongoose.model('Subscriber');

/**
 * Register Action
 * @param  {Object}   req
 * @param  {Object}   res
 * @return {Response}
 */
exports.subscribe = function(req, res) {
    var subscriber = new Subscriber(req.body);
    subscriber.provider = 'local';
    subscriber.save(function (err) {
        if (err) {
            if (err.code === 11000) {
                return res.json({
                    message: 'You\'ve already subscribed, thank you for interest in our product!'
                });
            } else {
                return res.json(err);
            }
        } else
            return res.json({
                status: 'ok',
                message: 'Thank for interest in our product, we\'ll notify you just before release.'
            });
    });
};
