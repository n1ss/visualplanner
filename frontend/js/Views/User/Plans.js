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
      var plans = new App.Collections.Plans();

      plans.fetch();
    },

    render: function() {
      this.$el.html(tmpl.render('User/Plans'));

      return this;
    },

    addPlan: function(e) {
      e.preventDefault();

      var $form = $(e.currentTarget);

      var plan = new App.Models.Plan({
        name: $form.find('#plan-name').val()
      });

      plan.save();

      console.log(plan);
    }
  });

  App.Views.User = App.Views.User || {};
  App.Views.User.Plans = Plans;
});
