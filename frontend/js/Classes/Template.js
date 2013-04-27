/**
 * Template wraper
 */
define([
  'handlebars',
  'Templates/templates'

],
function(Handlebars, Templates, I18n) {
  Handlebars.registerHelper('URL',
    function(str) {
      return encodeURIComponent(str);
    }
  );

  Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    if (arguments.length < 4) {
      // Operator omitted, assuming "+"
      options = rvalue;
      rvalue = operator;
      operator = "+";
    }
        
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
        
    return {
      "+": lvalue + rvalue,
      "-": lvalue - rvalue,
      "*": lvalue * rvalue,
      "/": lvalue / rvalue,
      "%": lvalue % rvalue
    }[operator];
  });

  Handlebars.registerHelper("keyValue", function(obj, options) {
    var buffer = "", key;

    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        buffer += options.fn({key: key, value: obj[key]});
      }
    }

    return buffer;
  });

  return {
    render: function(name, data) {
      var template = Handlebars.compile(Templates[name]);

      return template(data);
    },
    compile: function(name) {
      return Handlebars.compile(Templates[name]);
    }
  };
});