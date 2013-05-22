module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
  this.channelService = app.get('channelService');
};
var db = require("../../../../../shared/db/db");

var handler = Handler.prototype;

handler.initBone = function(msg, session, next){
	var channel = this.channelService.getChannel("channel",true);
	var users = channel.getMembers();
	for(var i=0,len=users.length;i<len;i++){
		var info_user = users[i].split("&");
		var channelService = this.channelService;
		db.getPerson().findOne({account:info_user[0]},function(err,user){
			var param = {
				route : "onInitBone" ,
				user : user
			};
			channelService.pushMessageByUids(param,[{
				uid : info_user[0]+"&"+info_user[1],
				sid : msg.sid
			}],function(){
				channelService = null;
			});
		});
	}
}

handler.move = function(msg,session,next){
	var channel = this.channelService.getChannel("channel",true);
	db.getPerson().update({account:msg.account},{$set:{x:msg.x,y:msg.y}},function(err,obj){
		var param = {
			route : "onMove" ,
			account : msg.account,
			direct_x : msg.x,
			direct_y : msg.y
		};
		channel.pushMessage(param);
	});
}