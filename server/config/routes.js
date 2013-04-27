// Routs
module.exports = function(app, passport, auth) {
  // Set content type for api methods
  app.get('/api/*', function(req, res, next) {
    res.contentType('application/json');
    next();
  });

  // User actions
  var UserController = require('../app/Сontrollers/UserController');
  
  app.post('/api/user/register', auth.requiresLogout, UserController.register);
  app.post('/api/user/login', function(req, res) {
    UserController.login.call(this, req, res, passport);
  });
  app.get('/api/user/logout', UserController.logout);
  app.get('/api/user/:id', auth.requiresLogin, UserController.index);

  var IndexController = require('../app/Сontrollers/IndexController');

  // Site routs
  app.get('/*', IndexController.index);
}