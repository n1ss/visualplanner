/**
 * Form Class
 */
define([
  'app',
  'backbone',
  'underscore'

], function(App, Backbone, _) {
  var Form = function($form) {
    this.$form = $form;

    this.data = {};
    this.inputs = [];

    this.getData();
  };

  Form.prototype = {

    /**
     * Get data from inputs
     * @return {Object}
     */
    getData: function() {
      var key, value, $input;

      this.$form.find('input').each(function(i, input) {
        $input = $(input);
        key = $input.attr('name');
        value = $input.val();

        if ($input.hasClass('send')) {
          this.data[key] = value;
        }

        this.inputs.push($input);
      }.bind(this));

      return this.data;
    },

    /**
     * Check validation for form
     * @return {Boolean}
     */
    checkValid: function() {
      this.isValid = true;
      this.messages = {};

      // check rules for inputs
      _.each(this.inputs, function($input) {
        this.checkInput($input);
      }, this);

      return this.isValid;
    },

    /**
     * Check current input
     * @param  {jQuery} $input
     * @return {Boolean}
     */
    checkInput: function($input) {
      var rules, valid;

      var $parent = $input.parents('.control-group');
      
      rules = $input.data('valid');
      rules = rules ? rules.split(' ') : undefined;

      _.each(rules, function(rule) {
        rule = 'is' + this.capitalise(rule);

        // check validation rule for input
        if (this[rule] && valid !== false) {
          valid = this[rule]($input);
        } else if (this[rule]) {
          this[rule]($input);
        }
      }, this);

      if (valid === false) {
        this.isValid = false;
        $parent.addClass('error');

        $input.off('keyup').on('keyup', function() {
          this.checkInput($input);
        }.bind(this));
      } else {
        $parent.removeClass('error');
      }

      return valid;
    },

    isRequired: function($input) {
      var valid = $input.val().length !== 0;

      return valid;
    },

    isEmail: function($input) {
      var valid = true;
      var re = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
      valid = re.test($input.val());

      return valid;
    },

    isSame: function($input) {
      var valid = true;
      var same = $input.data('validSame');
      var $same = this.$form.find('[name="' + same +'"]');

      $same.off('keyup.same').on('keyup.same', function() {
        this.checkInput($input);
      }.bind(this));

      valid = $input.val() === $same.val();

      return valid;
    },

    capitalise: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

  };

  return Form;
});
