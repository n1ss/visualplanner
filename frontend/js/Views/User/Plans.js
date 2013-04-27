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
      var plans = new App.Collections.Plans(),
          plan = this;

      plans.fetch({
        success: function(data) {
          console.log(data.toJSON());
          plan.$el.html(tmpl.render('User/Plans', data.toJSON()));
        }
      });
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

      this.$('.fn-plans').append('<li><a "plan-content" href="plan/">' + plan.get('name') + '</a></li>')
    }
  });

  App.Views.User = App.Views.User || {};
  App.Views.User.Plans = Plans;
});
