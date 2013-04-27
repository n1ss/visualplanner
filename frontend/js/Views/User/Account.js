define([
  'app',
  'backbone',
  'underscore',
  'tmpl',

  'Models/User',

  'Views/Base/View'

], function(App, Backbone, _, tmpl, User) {
  var Account = App.Views.BaseView.extend({

    events: {
      'submit .fn-account-form': 'subscribe'
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html(tmpl.render('User/Account', User.toJSON()));
      console.log(User.toJSON());
      return this;
    },

    subscribe: function(e) {
      e.preventDefault();

      var form = new Form(this.$('.fn-account-form'));

      if (form.checkValid()) {
        App.Network.send({
          url: '/api/user/account',
          data: form.data,
          type: 'post',
          context: this,
          success: function(data) {
            if (data.status) {
              User.trigger('logged', data.user);
            } else {
              var error = $('<p>').html(data.message);
              this.$('.messages').addClass('error').html(error);
            }
          }
        });
      }
    }

  });

  App.Views.User = App.Views.User || {};
  App.Views.User.Account = Account;
});
