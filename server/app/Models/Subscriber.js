// Subscriber schema, the person who is interested in our project ant would like to receive announcements

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var SubscriberSchema = new Schema({
    email: { type: String, unique: true },
    date: { type: Date, default: Date.now }
});

// validations
var validatePresenceOf = function (value) {
  return value && value.length;
}

// the below 4 validations only apply if you are signing up traditionally

SubscriberSchema.path('email').validate(function (email) {
  // if you are authenticating by any of the oauth strategies, don't validate
  return email.length;
}, 'Email cannot be blank');


mongoose.model('Subscriber', SubscriberSchema);
