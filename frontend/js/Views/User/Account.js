define([
  'app',
  'backbone',
  'underscore',
  'tmpl',

  'Models/User',

  'Classes/Form',

  'Views/Base/View'

], function(App, Backbone, _, tmpl, User, Form) {
  var Account = App.Views.BaseView.extend({

    events: {
      'submit .fn-account-form': 'subscribe'
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html(tmpl.render('User/Account', User.toJSON()));
      return this;
    },

    subscribe: function(e) {
      e.preventDefault();

      var form = new Form(this.$('.fn-account-form'));

      if (form.checkValid()) {
        User.save(form.data);
      }
    }

  });

  App.Views.User = App.Views.User || {};
  App.Views.User.Account = Account;
});
