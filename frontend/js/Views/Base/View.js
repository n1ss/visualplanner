/**
 * Awesome Mudule
 */
define([
  'app',
  'backbone',
  'underscore',
  'tmpl'

], function(App, Backbone, _, tmpl) {
  var BaseView = Backbone.View.extend({

    getTemplateFunction: function() {
      var template, templateFunc;

      template = this.template;
      
      if (typeof template === 'string') {
        templateFunc = tmpl.compile(template);

        this.constructor.prototype.template = templateFunc;
      } else {
        templateFunc = template;
      }

      return templateFunc;
    }

  });

  App.Views = App.Views || {};
  App.Views.BaseView = BaseView;
});
