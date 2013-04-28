// Favorite schema

var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var UserPlanSchema = new Schema({
    user: { type : Schema.ObjectId, ref : 'User' }
    , plan: { type : Schema.ObjectId, ref : 'Plan' }
});

/*
UserPlanSchema
    .index({ user: 1, createdAt: -1 })
*/

mongoose.model('UserPlan', UserPlanSchema)