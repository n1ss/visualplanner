define([
  'app',
  'backbone',
  'underscore',
  'tmpl',

  'Views/Base/View'

], function(App, Backbone, _, tmpl) {
  var Plan = App.Views.BaseView.extend({

    events: {
      'submit .add-milestone': 'addMilestone'
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html(tmpl.render('User/Plan'));

      require([
        'raphael'
      ],
      function() {
        require(['Components/Map']);
      });

      return this;
    }
  });

  App.Views.User = App.Views.User || {};
  App.Views.User.Plan = Plan;
});
