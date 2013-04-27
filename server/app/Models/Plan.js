// User schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var PlanSchema = new Schema({
    name: String
});

// validations
var validatePresenceOf = function (value) {
  return value && value.length;
}

// the below 4 validations only apply if you are signing up traditionally

PlanSchema.path('name').validate(function (name) {
  return name.length;
}, 'Name cannot be blank');

mongoose.model('Plan', PlanSchema);
