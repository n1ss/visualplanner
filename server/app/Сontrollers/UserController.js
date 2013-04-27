/**
 * User Controller
 */
var mongoose = require('mongoose')
    async = require('async')
  , User = mongoose.model('User')

/**
 * Get user info
 * @param  {Object}   req
 * @param  {Object}   res
 * @return {Response}
 */
exports.index = function(req, res) {
  res.json({
    status: true,
    user: req.user
  });
}

/**
 * Register Action
 * @param  {Object}   req
 * @param  {Object}   res
 * @return {Response}
 */
exports.register = function(req, res) {
  var user = new User(req.body);
  user.provider = 'local';
  user.save(function (err) {
    if (err) {
      if (err.code === 11000) {
        return res.json({
          message: 'Email is already in use'
        });
      } else {
        return res.json(err);
      }
    }

    req.logIn(user, function(err) {
      if (err) return res.json(500, err);

      res.json({
        status: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
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

exports.update = function (req, res, passport) {

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
