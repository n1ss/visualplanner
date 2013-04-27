/**
 * Index Controller
 */

/**
 * Index Action
 */
exports.index = function(req, res) {
  res.render('index', {
  	auth: req.isAuthenticated(),
  	user: req.user,
  	env: process.env.NODE_ENV
  });
}