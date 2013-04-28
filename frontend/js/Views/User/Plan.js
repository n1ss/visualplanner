define([
  'app',
  'backbone',
  'underscore',
  'tmpl',

  'Classes/Form',

  'Views/Base/View'

], function(App, Backbone, _, tmpl, Form) {
  var Plan = App.Views.BaseView.extend({

    events: {
      'submit .fn-add-milestone': 'addMilestone'
    },

    initialize: function() {

    },

    render: function() {
      this.$el.html(tmpl.render('User/Plan'));

      var plan = this;

      require([
        'raphael'
      ],
      function() {
        require(['Components/Mindmap'], function(Mindmap) {
          plan.mindmap = new Mindmap('plan-view');
        });
      });

      return this;
    },

    addMilestone: function(e) {
      e.preventDefault();

      var form = new Form($(e.currentTarget));

      if (form.checkValid()) {
        this.mindmap.addMilestone({
          title: form.$.find('#mailstone-name').val()
        });

        form.$.find('#mailstone-name').val('');
      }
    }
  });

  App.Views.User = App.Views.User || {};
  App.Views.User.Plan = Plan;
});
