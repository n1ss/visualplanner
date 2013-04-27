define([
  'app',
  'backbone',
  'underscore',
  'tmpl',

  'Views/Base/View',

  'Collections/Plans',
  'Models/Plan'

], function(App, Backbone, _, tmpl) {
  var Plans = App.Views.BaseView.extend({

    events: {
      'submit .fn-add-plan': 'addPlan'
    },

    initialize: function() {
      this.$el.html(tmpl.render('User/Plans'));
    },

    render: function() {
      var plans = new App.Collections.Plans(),
          plansView = this;

      plans.fetch({
        success: function(data) {
          _.each(data.toJSON(), function(plan) {
            plansView.$('.fn-plans').append(tmpl.render('User/PlanItem', plan));
          });
        }
      });

      return this;
    },

    addPlan: function(e) {
      e.preventDefault();

      var $form = $(e.currentTarget);

      var plan = new App.Models.Plan({
        name: $form.find('#plan-name').val()
      });

      plan.save();

      this.$('#plan-name').val('');
      this.$('.fn-plans').append(tmpl.render('User/PlanItem', plan.toJSON()));
    }
  });

  App.Views.User = App.Views.User || {};
  App.Views.User.Plans = Plans;
});
