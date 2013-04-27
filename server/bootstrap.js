// Module dependencies
var express = require('express')
  , mongoStore = require('connect-mongodb');

exports.boot = function(app, config, passport) {
  app.set('json spaces', 0);
  app.set('showStackError', true);
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/app/Views');
  app.set('domain', process.env.NODE_DOMAIN || '127.0.0.1');

  app.use('/', express.static(__dirname + '/../frontend'));

  app.use(express.logger(':method :url :status'));

  app.configure(function() {

    // cookieParser should be above session
    app.use(express.cookieParser());

    // bodyParser should be above methodOverride
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(express.session({
      secret: 'musicbird',
      store: new mongoStore({
        url: config.db,
        collection : 'sessions'
      })
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(app.router);

    // assume "not found" in the error msgs
    // is a 404. this is somewhat silly, but
    // valid, you can do whatever you like, set
    // properties, use instanceof etc.
    app.use(function(err, req, res, next) {
      // treat as 404
      if (~err.message.indexOf('not found')) return next();

      // log it
      console.error(err.stack);

      // error page
      res.status(500).render('500');
    });

    // assume 404 since no middleware responded
    app.use(function(req, res, next) {
      res.status(404).render('404', { url: req.originalUrl })
    });
  });

  app.set('showStackError', false);
}
