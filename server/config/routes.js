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
  app.put('/api/user/:id', auth.requiresLogin, UserController.update);

  // Subscriber controller
  var SubscriberController = require('../app/Сontrollers/SubscriberController');
  app.post('/subscribe', SubscriberController.subscribe);

  // Plans controller
  var PlanController = require('../app/Сontrollers/PlanController');
  app.get('/api/plans', auth.requiresLogin, PlanController.userPlans);
  app.post('/api/plan', auth.requiresLogin, PlanController.create);
  app.delete('/api/plan', auth.requiresLogin, PlanController.delete);

  //Milestone controller
  var MilestoneController = require('../app/Сontrollers/MilestoneController');
  app.post('/api/milestone', auth.requiresLogin, MilestoneController.create);
  app.put('/api/milestone', auth.requiresLogin, MilestoneController.put);
  app.delete('/api/milestone', auth.requiresLogin, MilestoneController.delete);

  var IndexController = require('../app/Сontrollers/IndexController');

  // Site routs
  app.get('/*', IndexController.index);
}