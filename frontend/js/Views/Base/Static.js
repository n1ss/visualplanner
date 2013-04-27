define([
  'app',
  'backbone',
  'underscore',
  'tmpl',

  'Views/Base/View'

], function(App, Backbone, _, tmpl) {
  var Static = App.Views.BaseView.extend({

    events: {

    },

    initialize: function() {
      
    },

    render: function() {
      this.$el.html(tmpl.render('Static/' + this.options.page));

      return this;
    }
  });

  App.Views.Base = App.Views.Base || {};
  App.Views.Base.Static = Static;
});
