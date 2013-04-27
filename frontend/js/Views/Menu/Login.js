/**
 * Login View
 */
define([
  'app',
  'backbone',
  'underscore',
  'tmpl',

  'Models/User',

  'Classes/Form',
  'Classes/Network',

  'Views/Base/View'

], function(App, Backbone, _, tmpl, User, Form) {
  var Login = App.Views.BaseView.extend({

    el: '.fn-user-side',

    events: {
      'submit .fn-login-form': 'login'
    },

    initialize: function() {

    },

    render: function() {
      this.$el.html(tmpl.render('Menu/Login'));

      return this;
    },

    login: function(e) {
      e.preventDefault();

      var form = new Form(this.$('.fn-login-form'));

      if (form.checkValid()) {
        App.Network.send({
          url: '/api/user/login',
          data: form.data,
          type: 'post',
          context: this,
          success: function(data) {
            if (data.status) {
              User.trigger('logged');
            } else {
              var error = $('<p>').html(data.message);
              this.$('.messages').addClass('error').html(error);
            }
          }
        });
      }
    }

  });

  App.Views.Menu = App.Views.Menu || {};
  App.Views.Menu.Login = Login;
});
