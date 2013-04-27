define([
  'app',
  'backbone',
  'underscore',
  'tmpl',

  'Views/Base/View',

  'Collections/Plans'

], function(App, Backbone, _, tmpl) {
  var Plans = App.Views.BaseView.extend({

    events: {

    },

    initialize: function() {
      var plans = new App.Collections.Plans();

      plans.fetch();
    },

    render: function() {
      this.$el.html(tmpl.render('User/Plans'));

      return this;
    }
  });

  App.Views.User = App.Views.User || {};
  App.Views.User.Plans = Plans;
});
