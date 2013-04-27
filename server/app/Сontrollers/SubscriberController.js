/**
 * Subscriber Controller
 */
var mongoose = require('mongoose')
async = require('async')
    , Subscriber = mongoose.model('Subscriber')

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
                status: 'ok'
            });
    });
}

/**
 * Login Action
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Object}   passport
 * @return {Response}
 */
exports.login = function (req, res, passport) {
    passport.authenticate('local', function(err, user, info) {
        if (err) return res.json(500, err);

        // user not found
        if (!user) return res.json(info);

        // login user
        req.logIn(user, function(err) {
            if (err) return res.json(500, err);

            return res.json({
                status: true,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        });
    })(req, res, passport);
}

/**
 * Logout Action
 * @param  {Object}   req
 * @param  {Object}   res
 * @return {Response}
 */
exports.logout = function(req, res) {
    req.logout();

    return res.json({
        status: true,
        message: 'logout successful'
    });
}
