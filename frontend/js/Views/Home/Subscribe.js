/**
 * Application View
 */
define([
  'app',
  'backbone',
  'underscore',
  'tmpl',

  'Classes/Form',

  'Views/Base/View'

], function(App, Backbone, _, tmpl, Form) {
  var Subscribe = App.Views.BaseView.extend({

    events: {
      'submit .fn-login-form': 'login'
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html(tmpl.render('Home/Subscribe'));

      return this;
    },

    login: function(e) {
      e.preventDefault();

      var form = new Form(this.$('.fn-login-form'));

      console.log(form.checkValid());

      if (form.checkValid()) {
        App.Network.send({
          url: '/user/login',
          data: form.data,
          type: 'post',
          context: this,
          success: function(data) {
            if (data.status) {
              alert('login success!');
            } else {
              var error = $('<p>').html(data.message);
              this.$('.messages').addClass('error').html(error);
            }
          }
        });
      }
    }

  });

  App.Views.Home = App.Views.Home || {};
  App.Views.Home.Subscribe = Subscribe;
});
