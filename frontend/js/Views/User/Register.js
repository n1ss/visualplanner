/**
 * Application View
 */
define([
  'app',
  'backbone',
  'underscore',
  'tmpl',

  'Models/User',

  'Classes/Form',

  'Views/Base/View'

], function(App, Backbone, _, tmpl, User, Form) {
  var Register = App.Views.BaseView.extend({

    events: {
      'submit .fn-register-form': 'subscribe'
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html(tmpl.render('User/Register'));
      return this;
    },

    subscribe: function(e) {
      e.preventDefault();

      var form = new Form(this.$('.fn-register-form'));

      if (form.checkValid()) {
        App.Network.send({
          url: '/api/user/register',
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
  App.Views.User.Register = Register;
});
