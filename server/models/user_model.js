const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:String,
    googleId:String,
    profile_pic:String,
    occupation:String,
    totalBudget:{type:Number,default:0},
    email:String
});

const User = mongoose.model('user',userSchema);

module.exports = User;