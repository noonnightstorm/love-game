module.exports = function(app) {
	return new GameRemote(app);
};

var GameRemote = function(app) {
	this.app = app;
	this.channelService = app.get('channelService');
}
var db = require("../../../../../shared/db/db");

GameRemote.prototype.addUser = function(uid,sid,room,flag){
	var channel = this.channelService.getChannel(room,flag);
	/*var users = null;
	if(!!channel){
		channel.add(uid,sid);
		users = channel.getMembers();
		console.log(users);
	}*/
	var user_info = uid.split("&");
	var account = user_info[0];
	var password = user_info[1];
	db.getPerson().findOne({account:account},function(err,user){
		var param = {
			route : "onAdd" ,
			user : user
		};
		channel.pushMessage(param);
	});
	if(!!channel){
		channel.add(uid,sid);
	}
}
