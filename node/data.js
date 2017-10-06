var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.createConnection('localhost', 'test');

var users  = new Schema({
    email: String,
    password: String
});

var data =new Schema({
	name:String,
	email:String,
	phone:Number,
	city:String,
	website:String,
	image:String
})


var user = db.model('user', users);
var data = db.model('data', data);
module.exports.user=user;
module.exports.data=data;