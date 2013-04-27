/*
 *  Generic require login routing middleware
 */
exports.requiresLogin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.json({
      error: 'authenticated error',
      message: 'Authenticated failed, you must be authorized'
    });
  }
  next();
};

exports.requiresLogout = function (req, res, next) {
  if (req.isAuthenticated()) {
    return res.json({
      error: 'authenticated error',
      message: 'Authenticated failed, you must be unauthorized'
    });
  }
  next();
};
