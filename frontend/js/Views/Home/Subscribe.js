/**
 * Application View
 */
define([
  'app',
  'backbone',
  'underscore',
  'tmpl',

  'Classes/Form',

  'Models/User',

  'Views/Base/View'

], function(App, Backbone, _, tmpl, Form, User) {
  var Subscribe = App.Views.BaseView.extend({

    events: {
      'submit .fn-subscribe-form': 'subscribe'
    },

    initialize: function() {
      if (User.id) {
        App.openPage('/plans', true);

        return;
      }

      App.content.html(this.render().el);
    },

    render: function() {
      this.$el.html(tmpl.render('Home/Subscribe'));

      return this;
    },

    subscribe: function(e) {
      e.preventDefault();

      var form = new Form(this.$('.fn-subscribe-form'));

      if (form.checkValid()) {
        App.Network.send({
          url: '/subscribe',
          data: form.data,
          type: 'post',
          context: this,
          success: function(data) {
            if (data.status === 'ok') {
              var text = $('<p>').html(data.message);
              this.$('.messages').addClass('info').html(text);
              this.$('.content').hide();
              this.$('footer').hide();
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
