// User schema

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MilestoneSchema = new Schema({
  title: String,
  description: String,
  position: {},
  user: { type : Schema.ObjectId, ref : 'User' }
});

// validations
var validatePresenceOf = function (value) {
  return value && value.length;
};

// the below 4 validations only apply if you are signing up traditionally

//traditionally.path('name').validate(function (name) {
//  return name.length;
//}, 'Name cannot be blank');

mongoose.model('Milestone', MilestoneSchema);
