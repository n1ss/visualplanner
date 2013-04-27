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
      'submit .fn-subscribe-form': 'subscribe'
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html(tmpl.render('Home/Subscribe'));

      return this;
    },

    subscribe: function(e) {
      e.preventDefault();

      var form = new Form(this.$('.fn-subscribe-form'));

      console.log(form.checkValid());

      if (form.checkValid()) {
        App.Network.send({
          url: '/subscribe',
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
