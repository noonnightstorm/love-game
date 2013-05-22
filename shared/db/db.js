var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/game");
var Schema = mongoose.Schema
	,ObjectId = Schema.ObjectId;

var Person = new Schema({
	account : String,
	password : String,
	name : String,
	x:Number,
	y:Number
});

var Record = new Schema({
	person_id : String,
	success:Boolean
});

var Persons = mongoose.model("Persons",Person);
var Record = mongoose.model("Records",Record);

exports.getPerson = function(){
	return Persons;
}
exports.getRecord = function(){
	return Records;
}


exports.check_login = function(req,res){
	Persons.findOne({account:req.params.account,password:req.params.password},function(err,obj){
		if(!obj){
			res.writeHead(200, {'content-type': 'text/json' });
			res.write( JSON.stringify({ result : "fail"}) );
			res.end('\n');
		}
		else{
			res.writeHead(200, {'content-type': 'text/json' });
			res.write( JSON.stringify({ result : "success"}) );
			res.end('\n');
		}
	});
}
exports.add_user = function(req,res){
	var person = new Persons();
	person.account = req.body.account;
	person.password = req.body.password;
	person.name = req.body.name;
	person.x = 0;
	person.y = 0;
	person.save();
	res.writeHead(200, {'content-type': 'text/json' });
	res.write( JSON.stringify({ result : "success"}) );
	res.end('\n');
}