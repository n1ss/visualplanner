define([
  'app',
  'backbone',
  'underscore',
  'tmpl',

  'Views/Base/View'

], function(App, Backbone, _, tmpl) {
  var Plan = App.Views.BaseView.extend({

    events: {

    },

    initialize: function() {
      require(['raphael'], function() {
        require(['Components/Map']);
      });
    },

    render: function() {
      this.$el.html(tmpl.render('User/Plan'));

      return this;
    }
  });

  App.Views.User = App.Views.User || {};
  App.Views.User.Plan = Plan;
});
