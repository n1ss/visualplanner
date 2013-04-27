/**
 * Application View
 */
define([
  'app',
  'backbone',
  'underscore',

  'Views/Base/View',
  'Views/Menu/Menu'

], function(App, Backbone, _) {
  var Application = App.Views.BaseView.extend({

    el: '#fn-application',

    content: $('#fn-page-wraper'),

    events: {
      'click a[data-type="app-link"]': 'clickLink'
    },

    initialize: function() {
      this.render();
    },

    render: function() {
      var menuView = new App.Views.Menu.Menu();

      return this;
    },

    clickLink: function(e) {
      if (this.preventDefaultEvent(e)) {
        return;
      }

      var $target = $(e.currentTarget);

      var url = $target.attr('href');
      var replace = $target.data('history') ? true : false;
      var menu = $target.data('menu');

      this.openPage(url, replace, menu);
    },

    openPage: function(url, replace, menu) {
      replace = replace !== undefined ? replace : false;

      App.Router.navigate(url, {trigger: true, replace: replace});
    },

    preventDefaultEvent: function(e, options) {
      options = options || {shift: 1, ctrl: 1, alt: 1, meta: 1};
      var href = e.currentTarget.getAttribute('href');
      if(((options.shift && e.shiftKey) || (options.alt && e.altKey) || (options.ctrl && e.ctrlKey) || (options.meta && e.metaKey)) && href && href.indexOf('#') !== 0) {
        return true;
      }
      e.preventDefault();
      return false;
    }

  });

  App.Views.Application = Application;
});
